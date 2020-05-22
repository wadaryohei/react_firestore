import { UserData } from '../../model/Datas/UserData'
import { UserPostsData } from '../../model/Datas/UserPostsData'
import { OtherUsersData } from '../../model/Datas/OtherUsersData'
import { Form } from '../../hooks/useForm'
import { Follow } from '../../hooks/useFollow'
import { HomePresenter } from './Presenter/UseHomePresenter'

export interface HomeDomsProps {
  user: UserData | undefined
  posts: UserPostsData[] | undefined
  otherUsers: OtherUsersData[] | undefined
  firebaseUser: firebase.User | null
  userLoading: boolean
  signOut: () => void
  form: Form
  follow: Follow
  presenter: HomePresenter
  className?: string
}

export interface HomeContainerProps {
  firebaseUser: firebase.User | null
}
