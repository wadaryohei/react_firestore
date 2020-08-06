import React, { useContext } from 'react'
import { Route, useLocation } from 'react-router-dom'
import { HomeContainer } from '../../containers/HomeContainer'
import { UserContainer } from '../../containers/UserContainer'
import { SignOutContainer } from '../../containers/SignOutContainer'
import { SignInContainer } from '../../containers/SignInContainer'
import { Routing } from '../../const/Routing'
import { useRoute } from '../../hooks/useRoute'
import { FirebaseAuthContext } from '../../context/authContext'

//----------------------------------
// component
//----------------------------------
export const Routes = () => {
  //----------------------------------
  // hooks
  //----------------------------------
  const auth = useContext(FirebaseAuthContext)
  const location = useLocation()
  // ルーティングに関するロジックをCustom Hooksに集約
  useRoute(auth)

  return (
    <>
      {/** @Route SignIn */}
      <Route exact path={Routing.signIn} component={SignInContainer} />

      {/** @Route SignOut */}
      <Route exact path={Routing.signOut} component={SignOutContainer} />

      {/** @Route Home */}
      <Route exact path={Routing.home} render={() => <HomeContainer />} />

      {/** @Route User */}
      <Route key={location.pathname} path={Routing.userId} render={() => <UserContainer />} />
    </>
  )
}
