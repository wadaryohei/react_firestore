import firebase from '../../../model/_shared/firebase'
import { AppPresenterViewData } from './AppPresenterViewData'

//----------------------------------
// type
//----------------------------------
export interface AppPresenter {
  viewDatas: () => AppPresenterViewData
}

//----------------------------------
// presenter
//----------------------------------
export const useAppPresenter = (
  _firebaseUser: firebase.User | null
): AppPresenter => {
  /**
   * viewDatas
   */
  const viewDatas = (): AppPresenterViewData => {
    return {
      firebaseUser: firebaseUser()
    }
  }

  /**
   * ユーザーを返す
   */
  const firebaseUser = (): firebase.User | null => {
    return _firebaseUser
  }

  return { viewDatas }
}
