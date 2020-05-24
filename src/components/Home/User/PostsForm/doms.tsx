/**
 * DOM層
 * - 宣言的UIを記述する
 * - データをPropsで受け取る
 * - 出し分け以外のロジックはContainer層で書く
 *   - props => ()とすることにより、余計なロジックが入らないようにする
 */
import React from 'react'
import { StyledTypography } from '../../../_shared/Typography/index'
import { PostsFormProps } from './types'

//----------------------------------
// component
//----------------------------------
export const PostsForm = (props: PostsFormProps) => (
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
    <StyledTypography
      variant={'p'}
      className={props.form.visibilityStatus(props.form.error())}
    >
      {props.form.error()}
    </StyledTypography>
  </form>
)
