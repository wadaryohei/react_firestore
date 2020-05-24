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
import { Box } from '@material-ui/core'
import { Margin } from '../../../../const/Margin'

//----------------------------------
// component
//----------------------------------
export const Posts = (props: PostsFormProps) => (
  //----------------------------------
  // render
  //----------------------------------
  <Box my={Margin.m8}>
    <StyledTypography variant={'p'}>
      {props.post?.postBody}
      <Box component={'span'} ml={Margin.m8}>
        <StyledButton
          size={'sm'}
          color={'cancel'}
          onClick={() => props.form.onDelete(props.post?.docId)}
        >
          削除する
        </StyledButton>
      </Box>
    </StyledTypography>
  </Box>
)
