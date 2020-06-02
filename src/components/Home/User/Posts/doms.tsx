/**
 * DOM層
 * - 宣言的UIを記述する
 * - データをPropsで受け取る
 * - 出し分け以外のロジックはContainer層で書く
 *   - props => ()とすることにより、余計なロジックが入らないようにする
 */
import React from 'react'
import { Typography } from '../../../_shared/Typography/index'
import { Button } from '../../../_shared/Button/index'
import { useFormProps } from '../../../../hooks/useForm'
import { UserPostsData } from '../../../../model/Datas/UserPostsData'

//----------------------------------
// props
//----------------------------------
export interface PostsFormProps {
  post: UserPostsData | undefined
  form: useFormProps
  className?: string
}

//----------------------------------
// component
//----------------------------------
export const PostsDoms = (props: PostsFormProps) => (
  //----------------------------------
  // render
  //----------------------------------
  <div className={props.className}>
    <Typography variant={'p'}>{props.post?.postBody}</Typography>
    <Typography variant={'p'}>
      <Button
        size={'sm'}
        color={'cancel'}
        onClick={() => props.form.onDelete(props.post?.docId)}
      >
        削除する
      </Button>
    </Typography>
  </div>
)
