import React from 'react'
import { Typography } from '../Typography/index'
import { Button } from '../Button/index'
import { Link } from '../Link'
import { Image } from '../Image'
import { useFormType } from '../../../hooks/useForm'
import { PostType } from '../../../model/Post/type'

//----------------------------------
// props
//----------------------------------
export interface PostProps {
  post: PostType
  form: useFormType
  user: firebase.User | null
  className?: string
}

//----------------------------------
// component
//----------------------------------
export const PostComponent = (props: PostProps) => (
  <div className={props.className}>
    <div>
      <Link to={`/user/${props.post.authorId}`}>
        <Image className={'postImage'} src={props.post?.userImages} alt={props.post?.userImages} width={80} height={80} />
      </Link>
    </div>

    <div className={'contentWrapper'}>
      <div className={'leadWrapper'}>
        <Typography component={'p'} className={'name'}>
          {props.post?.userName}
        </Typography>
        <Typography component={'p'} className={'date'}>
          {props.post?.createdAt}
        </Typography>
      </div>
      <div className={'bodyWrapper'}>
        <Typography component={'p'}>{props.post?.postBody}</Typography>
      </div>
      <div className={'actionWrapper'}>
        {props.user?.uid === props.post.authorId && (
          <Typography component={'p'}>
            <Button size={'sm'} color={'cancel'} onClick={() => props.form.onDelete(props.post?.docId)}>
              削除する
            </Button>
          </Typography>
        )}
      </div>
    </div>
  </div>
)
