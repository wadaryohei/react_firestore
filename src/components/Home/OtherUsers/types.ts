import { OtherUsersData } from '../../../model/Datas/OtherUsersData'
import { useFollowProps } from '../../../hooks/useFollow'

export interface OtherUsersProps {
  firebaseUser: firebase.User | null
  otherUser: OtherUsersData | undefined
  follow: useFollowProps
  userLoading: boolean
  className?: string
}
