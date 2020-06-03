import { UserData, UserPostsData } from '../../../model/Datas/User/types'

export interface HomePresenterViewData {
  user: UserData | undefined
  users: UserData[] | undefined
  posts: UserPostsData[] | undefined
}
