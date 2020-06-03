/**
 * Container層
 * - スタイルコンポーネントにデータを渡す
 * - ロジックが必要な場合は、ここに記述する
 */
import React from 'react'
import { useAuthenticate } from '../../hooks/useAuthenticate'
import { useAppPresenter } from './Presenter/UseAppPresenter'
import { Route } from 'react-router-dom'
import { Routes } from '../../components/Routes'
import { Loading } from '../../components/_shared/Loading'
import { AppWrapper } from './styles'

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
      {authenticate.loading && <Loading text={'Loading...'} />}
      {!authenticate.loading && (
        <AppWrapper>
          <Route
            path="/"
            render={() => <Routes firebaseUser={presenter.firebaseUser()} />}
          />
        </AppWrapper>
      )}
    </>
  )
}
