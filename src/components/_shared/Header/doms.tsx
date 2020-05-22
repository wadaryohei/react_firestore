/**
 * DOM層
 * - 宣言的UIを記述する
 * - データをPropsで受け取る
 * - 出し分け以外のロジックはContainer層で書く
 *   - props => ()とすることにより、余計なロジックが入らないようにする
 */
import React from 'react'
import { StyledTypography } from '../Typography/index'
import { HeaderProps } from './types'

//----------------------------------
// component
//----------------------------------
export const Header = (props: HeaderProps) => (
  //----------------------------------
  // render
  //----------------------------------
  <div className={props.className}>
    <StyledTypography variant={'h1'} color={'white'}>
      React × Firebase
    </StyledTypography>
  </div>
)
