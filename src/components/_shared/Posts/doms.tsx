import React from 'react'
import { Typography } from '../Typography/index'
import { Button } from '../Button/index'
import { useFormProps } from '../../../hooks/useForm'
import { PostsData } from '../../../model/Datas/Post/type'

//----------------------------------
// props
//----------------------------------
export interface PostsFormProps {
  post: PostsData
  form: useFormProps
  user: firebase.User | null
  className?: string
}

//----------------------------------
// component
//----------------------------------
export const PostsDoms = (props: PostsFormProps) => (
  <div className={props.className}>
    <div>
      <img src={props.post?.userImages} alt={props.post?.userImages} width={80} height={80} />
    </div>

    <div className={'contentWrapper'}>
      <div className={'leadWrapper'}>
      <Typography component={'p'} className={'name'}>{props.post?.userName}</Typography>
      <Typography component={'p'} className={'date'}>{props.post?.createdAt}</Typography>
      </div>
      <div className={'bodyWrapper'}>
        <Typography component={'p'}>{props.post?.postBody}</Typography>
      </div>
      <div className={'actionWrapper'}>
      {
        props.user?.uid === props.post.authorId && (
          <Typography component={'p'}>
          <Button
            size={'sm'}
            color={'cancel'}
            onClick={() => props.form.onDelete(props.post?.docId)}
          >
            削除する
          </Button>
        </Typography>
        )
      }
      </div>
    </div>
  </div>
)
