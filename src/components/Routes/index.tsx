import React from 'react'
import { Route } from 'react-router-dom'
import { HomeContainer } from '../../containers/HomeContainer'
import { UserContainer } from '../../containers/UserContainer'
import { SignOutContainer } from '../../containers/SignOutContainer'
import { SignInContainer } from '../../containers/SignInContainer'
import { Routing } from '../../const/Routing'
import { useRoute } from '../../hooks/useRoute'

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
