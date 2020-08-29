import { useLocation, useHistory } from 'react-router-dom'
import { useEffect, useCallback } from 'react'
import { Routing } from '../const/Routing'

//----------------------------------
// hooks
//----------------------------------
export const useRoute = (firebaseUser: firebase.User | null) => {
  const location = useLocation()
  const history = useHistory()

  /**
   * ログインしているかどうかで遷移できるRoutingを判断するナビゲーションガード
   */
  const privateRoute = useCallback(() => {
    if (firebaseUser) {
      history.push(location.pathname)
      // ログインしている状態でSignInページに遷移した場合'/'にリダイレクトする
      if (location.pathname === Routing.signIn) {
        history.push(Routing.home)
      }
    } else {
      history.push(Routing.signIn)
    }
  }, [firebaseUser, history, location.pathname])

  //----------------------------------
  // lifeCycle
  //----------------------------------
  useEffect(() => {
    privateRoute()
  }, [privateRoute])
}
