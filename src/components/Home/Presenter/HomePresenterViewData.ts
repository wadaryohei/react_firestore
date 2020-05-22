import { UserData } from '../../../model/Datas/UserData'
import { UserPostsData } from '../../../model/Datas/UserPostsData'
import { OtherUsersData } from '../../../model/Datas/OtherUsersData'

export interface HomePresenterViewData {
  user: UserData | undefined
  posts: UserPostsData[] | undefined
  otherUsers: OtherUsersData[] | undefined
}
