/**
 * DOM層
 * - 宣言的UIを記述する
 * - データをPropsで受け取る
 * - 出し分け以外のロジックはContainer層で書く
 *   - props => ()とすることにより、余計なロジックが入らないようにする
 */
import React from 'react'
import { Typography } from '../../../_shared/Typography/index'
import { useFormProps } from '../../../../hooks/useForm'

//----------------------------------
// props
//----------------------------------
export interface PostsFormProps {
  form: useFormProps
  className?: string
}

//----------------------------------
// component
//----------------------------------
export const PostsFormDoms = (props: PostsFormProps) => (
  //----------------------------------
  // render
  //----------------------------------
  <form className={props.className} onSubmit={e => props.form.onSubmit(e)}>
    <input
      value={props.form.text()}
      type="text"
      onChange={e => props.form.onChangeText(e.target.value)}
      onKeyPress={e => props.form.onKeyPress(e, props.form.text())}
    />
    <input
      type="submit"
      disabled={props.form.disabled()}
      onClick={() => props.form.onClick(props.form.text())}
    />
    <Typography
      variant={'p'}
      className={props.form.visibilityStatus(props.form.error())}
    >
      {props.form.error()}
    </Typography>
  </form>
)
