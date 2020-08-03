import { UserType } from '../../../model/User/types'
import { PostType } from '../../../model/Post/type'
import { HomePresenterViewData } from './HomePresenterViewData'

//----------------------------------
// type
//----------------------------------
export interface HomePresenter {
  viewDatas: () => HomePresenterViewData
  isExsistsPosts: () => boolean
}

//----------------------------------
// presenter
//----------------------------------
export const useHomePresenter = (
  _user: UserType | undefined,
  _posts: PostType[] | undefined
): HomePresenter => {
  /**
   * viewData
   */
  const viewDatas = (): HomePresenterViewData => {
    return {
      posts: posts(),
      user: user(),
    }
  }

  /**
   * ポストデータを返す
   */
  const posts = (): PostType[] | undefined => {
    return _posts?.map((post: PostType) => {
      return {
        docId: post?.docId,
        authorId: post?.authorId,
        userName: post?.userName,
        userImages: post?.userImages,
        postBody: post?.postBody,
        createdAt: post?.createdAt,
      }
    })
  }

  /**
   * ユーザーデータを返す
   */
  const user = (): UserType => {
    return {
      id: _user?.id as string,
      name: _user?.name as string,
      photoURL: _user?.photoURL as string | undefined
    }
  }

  /**
   * 取得したポストデータが存在するかどうか
   */
  const isExsistsPosts = (): boolean => {
    return _posts !== undefined && _posts.length !== 0 ? true : false
  }

  // /**
  //  * フォローが何人いるかどうか
  //  */
  // const followingCount = (users: UserData | undefined) => {
  //   return users?.followingCount === 0 ? 0 : users?.followingCount
  // }

  // /**
  //  * フォロワーが何人いるかどうか
  //  */
  // const followerCount = (users: UserData | undefined) => {
  //   return users?.followerCount === 0 ? 0 : users?.followerCount
  // }

  // /**
  //  * ユーザーが誰もいないかどうかを判定
  //  */
  // const isEmptyUsers = (): boolean => {
  //   return _users === undefined || _users?.length === 0 ? true : false
  // }

  // /**
  //  * ユーザーが存在しない場合に表示する文言
  //  */
  // const emptyUsersMessage = (): string | undefined => {
  //   if (_users === undefined || _users?.length === 0) {
  //     return '他にユーザーが存在しません'
  //   } else {
  //     return
  //   }
  // }

  return {
    viewDatas,
    isExsistsPosts
  }
}
