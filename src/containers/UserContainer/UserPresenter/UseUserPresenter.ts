import { UserType } from '../../../model/User/types'
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
  _user: UserType | undefined
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
  const user = (): UserType => {
    return {
      id: _user?.id as string,
      name: _user?.name as string,
      followerCount: followerCount() as number,
      followingCount: followingCount() as number,
      photoURL: _user?.photoURL as string | undefined
    }
  }

  /**
   * フォローが何人いるかどうか
   */
  const followingCount = () => {
    return _user?.followingCount === 0 ? 0 : _user?.followingCount
  }

  /**
   * フォロワーが何人いるかどうか
   */
  const followerCount = () => {
    return _user?.followerCount === 0 ? 0 : _user?.followerCount
  }

  return {
    viewDatas
  }
}
