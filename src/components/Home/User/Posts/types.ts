import { Form } from '../../../../hooks/useForm'
import { UserPostsData } from '../../../../model/Datas/UserPostsData'

export interface PostsFormProps {
  post: UserPostsData | undefined
  form: Form
}
