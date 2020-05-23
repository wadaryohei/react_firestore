import { UserData } from '../../../model/Datas/UserData'

export interface HeaderContainerProps {
  firebaseUser: firebase.User | null
}

export interface HeaderDomsProps {
  user: UserData | undefined
  className?: string
}
