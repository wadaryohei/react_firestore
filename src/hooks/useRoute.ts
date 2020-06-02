import { useLocation, useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import { Routes } from '../const/Routes'

//----------------------------------
// hooks
//----------------------------------
export const useRoute = (firebaseUser: firebase.User | null) => {
  const location = useLocation()
  const history = useHistory()

  //----------------------------------
  // lifeCycle
  //----------------------------------
  useEffect(() => {
    privateRoute()
    // eslint-disable-next-line
  }, [])

  /**
   * ログインしているかどうかで遷移できるRoutingを判断するナビゲーションガード
   */
  const privateRoute = () => {
    if (firebaseUser) {
      history.push(location.pathname)
      if (location.pathname === Routes.signIn) {
        history.push(Routes.home)
      }
    } else {
      history.push(Routes.signIn)
    }
  }
  console.log(location)
}