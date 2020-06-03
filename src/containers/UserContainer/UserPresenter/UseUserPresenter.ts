import { UserData } from '../../../model/Datas/UserData'
import { UserPresenterViewData } from './UserPresenterViewData'

//----------------------------------
// type
//----------------------------------
export interface UserPresenter {
  viewDatas: () => UserPresenterViewData
}

//----------------------------------
// presenter
//----------------------------------
export const useUserPresenter = (
  _user: UserData | undefined
): UserPresenter => {
  /**
   * viewData
   */
  const viewDatas = (): UserPresenterViewData => {
    return {
      user: user()
    }
  }

  /**
   * ユーザーデータを返す
   */
  const user = (): UserData => {
    return {
      id: _user?.id as string,
      name: _user?.name as string,
      photoURL: _user?.photoURL as string | undefined
    }
  }

  return {
    viewDatas
  }
}
