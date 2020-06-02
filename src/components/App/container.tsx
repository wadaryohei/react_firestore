/**
 * Container層
 * - スタイルコンポーネントにデータを渡す
 * - ロジックが必要な場合は、ここに記述する
 */
import React from 'react'
import { useAuthenticate } from '../../hooks/useAuthenticate'
import { useAppPresenter } from './Presenter/UseAppPresenter'
import { Loading } from '../_shared/Loading/index'
import { Routes } from '../Routes/index'
import { Route } from 'react-router-dom'

//----------------------------------
// props
//----------------------------------
export interface AppProps {
  className?: string
}

//----------------------------------
// component
//----------------------------------
export const AppContainer = (props: AppProps) => {
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
        <div className={props.className}>
          <Route
            path="/"
            render={() => <Routes firebaseUser={presenter.firebaseUser()} />}
          />
        </div>
      )}
    </>
  )
}
