/**
 * DOM層
 * - 宣言的UIを記述する
 * - データをPropsで受け取る
 * - 出し分け以外のロジックはContainer層で書く
 *   - props => ()とすることにより、余計なロジックが入らないようにする
 */
import React from 'react'
import { StyledCardMedia } from '../../../_shared/CardMedia/index'
import { StyledTypography } from '../../../_shared/Typography/index'
import { ProfileProps } from './types'

//----------------------------------
// component
//----------------------------------
export const Profile = (props: ProfileProps) => (
  //----------------------------------
  // render
  //----------------------------------
  <>
    <StyledCardMedia imgSrc={props.user?.photoURL} alt={props.user?.photoURL} />
    <StyledTypography variant={'p'}>
      LoginName / {props.user?.name}
    </StyledTypography>
    <StyledTypography variant={'p'}>
      UserId / {props.firebaseUser?.uid}
    </StyledTypography>
  </>
)
