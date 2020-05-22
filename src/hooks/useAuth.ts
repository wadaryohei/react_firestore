import firebase from '../model/_shared/firebase'

//----------------------------------
// interface
//----------------------------------
export interface Auth {
  signIn: () => Promise<void>
  signOut: () => void
}

//----------------------------------
// hooks
//----------------------------------
export const useAuth = () => {
  /**
   * ログイン処理
   * @access public
   */
  const signIn = async (): Promise<void> => {
    const provider = new firebase.auth.GoogleAuthProvider().setCustomParameters(
      {
        prompt: 'select_account'
      }
    )
    firebase.auth().signInWithRedirect(provider)
  }

  /**
   * ログアウト処理
   * @access public
   */
  const signOut = (): void => {
    firebase.auth().signOut()
  }

  return {
    signIn,
    signOut
  }
}
