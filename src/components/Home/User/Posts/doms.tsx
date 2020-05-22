/**
 * DOM層
 * - 宣言的UIを記述する
 * - データをPropsで受け取る
 * - 出し分け以外のロジックはContainer層で書く
 *   - props => ()とすることにより、余計なロジックが入らないようにする
 */
import React from 'react'
import { StyledTypography } from '../../../_shared/Typography/index'
import { StyledButton } from '../../../_shared/Button/index'
import { PostsFormProps } from './types'

//----------------------------------
// component
//----------------------------------
export const Posts = (props: PostsFormProps) => (
  //----------------------------------
  // render
  //----------------------------------
  <StyledTypography variant={'p'}>
    {props.post?.postBody}
    <StyledButton
      size={'sm'}
      color={'cancel'}
      onClick={() => props.form.onDelete(props.post?.docId)}
    >
      削除する
    </StyledButton>
  </StyledTypography>
)
