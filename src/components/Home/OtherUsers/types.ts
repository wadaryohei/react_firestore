import { OtherUsersData } from '../../../model/Datas/OtherUsersData'
import { Follow } from '../../../hooks/useFollow'

export interface OtherUsersProps {
  firebaseUser: firebase.User | null
  otherUser: OtherUsersData | undefined
  follow: Follow
  userLoading: boolean
  className?: string
}
