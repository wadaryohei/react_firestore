import { UserType } from '../../../model/User/types'

export interface UserPresenterViewData {
  user: UserType | undefined
  currentUser: UserType | undefined
}
