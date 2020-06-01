/**
 * Container層
 * - スタイルコンポーネントにデータを渡す
 * - ロジックが必要な場合は、ここに記述する
 */
import React from 'react'
import { useAuthenticate } from '../../hooks/useAuthenticate'
import { useAppPresenter } from './Presenter/UseAppPresenter'
import { StyledApp } from './styles'
import { StyledLoading } from '../_shared/Loading/index'

//----------------------------------
// component
//----------------------------------
export const App = () => {
  //----------------------------------
  // hooks
  //----------------------------------
  const authenticate = useAuthenticate()
  const presenter = useAppPresenter(authenticate.firebaseUser)

  //----------------------------------
  // render
  //----------------------------------
  return (
    <>
      {authenticate.loading && <StyledLoading text={'Loading...'} />}
      {!authenticate.loading && (
        <StyledApp firebaseUser={presenter.firebaseUser()} />
      )}
    </>
  )
}
