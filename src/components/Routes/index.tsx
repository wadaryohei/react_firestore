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
import { Routing } from '../../const/Routing'

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
      <Route exact path={Routing.signIn} component={SignInContainer} />

      {/** @Route SignOut */}
      <Route exact path={Routing.signOut} component={SignOutContainer} />

      {/** @Route Home */}
      <Route
        exact
        path={Routing.home}
        render={() => <HomeContainer firebaseUser={props.firebaseUser} />}
      />

      {/** @Route User */}
      <Route
        path={Routing.userId}
        render={() => <UserContainer firebaseUser={props.firebaseUser} />}
      />
    </>
  )
}
