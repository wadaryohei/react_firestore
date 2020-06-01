import firebase from '../../../model/_shared/firebase'

//----------------------------------
// type
//----------------------------------
export interface AppPresenter {
  firebaseUser: () => firebase.User | null
}

//----------------------------------
// presenter
//----------------------------------
export const useAppPresenter = (
  _firebaseUser: firebase.User | null
): AppPresenter => {

  /**
   * ユーザーを返す
   */
  const firebaseUser = (): firebase.User | null => {
    return _firebaseUser
  }

  return { firebaseUser }
}
