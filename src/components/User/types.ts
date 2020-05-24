import { UserData } from '../../model/Datas/UserData'

export interface UserDomsProps {
  user: UserData | undefined
  firebaseUser: firebase.User | null
  signOut: () => void
  onOpen: () => void
  className?: string
}

export interface UserContainerProps {
  firebaseUser: firebase.User | null
}
