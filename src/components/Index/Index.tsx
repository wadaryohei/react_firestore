/**
 * Container層
 * - スタイルコンポーネントにデータを渡す
 * - ロジックが必要な場合は、ここに記述する
 */
import React from 'react'
import { Route } from 'react-router-dom'
import { Home } from '../Home/'
import { SignIn } from '../SignIn/'
import { User } from '../User/'
import { SignOut } from '../SignOut/'
import { IndexProps } from './types'

//----------------------------------
// component
//----------------------------------
export const Index = (props: IndexProps) => {
  //----------------------------------
  // render
  //----------------------------------
  return (
    <>
      {/** @Route Home */}
      <Route
        exact
        path="/home"
        render={() => <Home firebaseUser={props.viewDatas.firebaseUser} />}
      />

      {/** @Route User */}
      <Route
        path="/user/:id"
        render={() => <User firebaseUser={props.viewDatas.firebaseUser} />}
      />

      {/** @Route SignIn */}
      <Route exact path="/signin" component={SignIn} />

      {/** @Route SignOut */}
      <Route exact path="/signout" component={SignOut} />
    </>
  )
}
