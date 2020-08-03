import firebase from '../model/_shared/firebase'

//----------------------------------
// type
//----------------------------------
export interface useAuthType {
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

//----------------------------------
// hooks
//----------------------------------
export const useAuth = (): useAuthType => {
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
