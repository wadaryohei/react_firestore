/**
 * DOM層
 * - 宣言的UIを記述する
 * - データをPropsで受け取る
 * - 出し分け以外のロジックはContainer層で書く
 *   - props => ()とすることにより、余計なロジックが入らないようにする
 */
import React from 'react'
import { StyledTypography } from '../_shared/Typography/index'

//----------------------------------
// component
//----------------------------------
export const SignOut = () => (
  //----------------------------------
  // render
  //----------------------------------
  <div>
    <StyledTypography variant={'p'}>ログアウトしました</StyledTypography>
    <a href="/">TOPに戻る</a>
  </div>
)
