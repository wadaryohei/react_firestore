import { UserData } from '../../../model/Datas/User/types'
import { PostsData } from '../../../model/Datas/Post/type';

export interface HomePresenterViewData {
  user: UserData | undefined
  users: UserData[] | undefined
  posts: PostsData[] | undefined
}
