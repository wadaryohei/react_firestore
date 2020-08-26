/**
 * Container層
 * - スタイルコンポーネントにデータを渡す
 * - ロジックが必要な場合は、ここに記述する
 */
import React from 'react'
import { Route } from 'react-router-dom'
import { Routes } from '../../components/Routes'
import { Loading } from '../../components/_shared/Loading'
import { Head } from '../../components/_shared/Head'
import { useAuthenticate } from '../../hooks/useAuthenticate'
import { FirebaseAuthContext } from '../../context/authContext'

//----------------------------------
// component
//----------------------------------
export const App = () => {
  //----------------------------------
  // hooks
  //----------------------------------
  const authenticate = useAuthenticate()
  return (
    <FirebaseAuthContext.Provider value={authenticate.firebaseUser}>
      <Head />
      {authenticate.loading && <Loading text={'Loading...'} />}
      {!authenticate.loading && <Route path="/" render={() => <Routes />} />}
    </FirebaseAuthContext.Provider>
  )
}
