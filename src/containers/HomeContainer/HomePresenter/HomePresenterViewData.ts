import { UserType } from '../../../model/User/types'
import { PostType } from '../../../model/Post/type'

export interface HomePresenterViewData {
  user: UserType
  posts: PostType[]
}
