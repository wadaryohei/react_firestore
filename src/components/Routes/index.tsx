/**
 * Container層
 * - スタイルコンポーネントにデータを渡す
 * - ロジックが必要な場合は、ここに記述する
 */
import React from 'react'
import { Route } from 'react-router-dom'
import { useRoute } from '../../hooks/useRoute'
import { SignOutContainer } from '../../containers/SignOutContainer'
import { SignInContainer } from '../../containers/SignInContainer'
import { HomeContainer } from '../../containers/HomeContainer'
import { UserContainer } from '../../containers/UserContainer'

//----------------------------------
// props
//----------------------------------
export interface RoutesProps {
  firebaseUser: firebase.User | null
}

//----------------------------------
// component
//----------------------------------
export const Routes = (props: RoutesProps) => {
  //----------------------------------
  // hooks
  //----------------------------------
  // ルーティングに関するロジックをCustom Hooksに集約
  useRoute(props.firebaseUser)

  //----------------------------------
  // render
  //----------------------------------
  return (
    <>
      {/** @Route SignIn */}
      <Route exact path="/signin" component={SignInContainer} />

      {/** @Route SignOut */}
      <Route exact path="/signout" component={SignOutContainer} />

      {/** @Route Home */}
      <Route
        exact
        path="/home"
        render={() => <HomeContainer firebaseUser={props.firebaseUser} />}
      />

      {/** @Route User */}
      <Route
        path="/user/:id"
        render={() => <UserContainer firebaseUser={props.firebaseUser} />}
      />
    </>
  )
}
