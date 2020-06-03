import { UserData, UserPostsData } from '../../../model/Datas/User/types'
import { HomePresenterViewData } from './HomePresenterViewData'

//----------------------------------
// type
//----------------------------------
export interface HomePresenter {
  viewDatas: () => HomePresenterViewData
  isPostsDividerShow: () => boolean | undefined
  isUsersDividerShow: (index: number) => boolean | undefined
  isEmptyUsers: () => boolean
  emptyUsersMessage: () => string | undefined
}

//----------------------------------
// presenter
//----------------------------------
export const useHomePresenter = (
  _user: UserData | undefined,
  _users: UserData[] | undefined,
  _posts: UserPostsData[] | undefined
): HomePresenter => {
  /**
   * viewData
   */
  const viewDatas = (): HomePresenterViewData => {
    return {
      posts: posts(),
      user: user(),
      users: users()
    }
  }

  /**
   * ポストデータを返す
   */
  const posts = (): UserPostsData[] | undefined => {
    return _posts?.map((post: UserPostsData) => {
      return {
        docId: post?.docId,
        authorId: post?.authorId,
        postBody: post?.postBody
      }
    })
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

  /**
   * ログイン中のユーザーデータ以外を返す
   */
  const users = (): UserData[] | undefined => {
    return _users?.map(
      (_user): UserData => {
        return {
          id: _user?.id,
          isFollow: _user?.isFollow as boolean,
          name: _user?.name,
          photoURL: _user?.photoURL
        }
      }
    )
  }

  /**
   * postsが1件でも存在すればDividerを表示させる
   */
  const isPostsDividerShow = (): boolean | undefined => {
    return _posts?.length ? true : false
  }

  /**
   * 最後のUsers情報にはDividerを表示しない
   */
  const isUsersDividerShow = (index: number): boolean | undefined => {
    if (_users !== undefined) {
      return _users.length - 1 !== index
    }
  }

  /**
   * ユーザーが誰もいないかどうかを判定
   */
  const isEmptyUsers = (): boolean => {
    return _users === undefined || _users?.length === 0 ? true : false
  }

  /**
   * ユーザーが存在しない場合に表示する文言
   */
  const emptyUsersMessage = (): string | undefined => {
    if (_users === undefined || _users?.length === 0) {
      return '他にユーザーが存在しません'
    } else {
      return
    }
  }

  return {
    viewDatas,
    isPostsDividerShow,
    isUsersDividerShow,
    isEmptyUsers,
    emptyUsersMessage
  }
}
