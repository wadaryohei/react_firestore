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
  _user: UserType,
  _currentUser: UserType
): UserPresenter => {
  /**
   * viewData
   */
  const viewDatas = (): UserPresenterViewData => {
    return {
      user: user(),
      currentUser: currentUser()
    }
  }

  /**
   * ユーザーデータを返す
   */
  const user = (): UserType => {
    return {
      id: _user.id as string,
      name: _user.name as string,
      followerCount: followerCount() as number,
      followingCount: followingCount() as number,
      photoURL: _user.photoURL as string
    }
  }

  /**
   * 現在ログイン中のユーザーデータを返す
   */
  const currentUser = (): UserType => {
    return {
      id: _currentUser.id as string,
      name: _currentUser.name as string,
      followerCount: followerCount() as number,
      followingCount: followingCount() as number,
      photoURL: _currentUser.photoURL as string
    }
  }

  /**
   * フォローが何人いるかどうか
   */
  const followingCount = () => {
    return _user.followingCount === 0 ? 0 : _user.followingCount
  }

  /**
   * フォロワーが何人いるかどうか
   */
  const followerCount = () => {
    return _user.followerCount === 0 ? 0 : _user.followerCount
  }

  return {
    viewDatas
  }
}
