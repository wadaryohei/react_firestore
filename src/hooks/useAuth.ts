import firebase from '../model/_shared/firebase'

//----------------------------------
// interface
//----------------------------------
export interface useAuthProps {
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

//----------------------------------
// hooks
//----------------------------------
export const useAuth = (): useAuthProps => {
  /**
   * ログイン処理
   */
  const signIn = async (): Promise<void> => {
    const provider = new firebase.auth.GoogleAuthProvider().setCustomParameters(
      {
        prompt: 'select_account'
      }
    )
    await firebase.auth().signInWithRedirect(provider)
  }

  /**
   * ログアウト処理
   */
  const signOut = async (): Promise<void> => {
    await firebase.auth().signOut()
  }

  return {
    signIn,
    signOut
  }
}
