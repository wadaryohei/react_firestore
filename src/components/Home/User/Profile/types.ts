import { UserData } from '../../../../model/Datas/UserData'

export interface ProfileProps {
  user: UserData | undefined
  firebaseUser: firebase.User | null
  className?: string
}
