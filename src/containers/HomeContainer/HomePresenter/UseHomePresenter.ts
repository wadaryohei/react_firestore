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
      user: user()
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
        createdAt: post?.createdAt
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
      followerCount: _user?.followerCount as number,
      followingCount: _user?.followingCount as number,
      photoURL: _user?.photoURL as string | undefined
    }
  }

  /**
   * 取得したポストデータが存在するかどうか
   */
  const isExsistsPosts = (): boolean => {
    return _posts !== undefined && _posts.length !== 0 ? true : false
  }

  return {
    viewDatas,
    isExsistsPosts
  }
}
