/**
 * DOM層
 * - 宣言的UIを記述する
 * - データをPropsで受け取る
 * - 出し分け以外のロジックはContainer層で書く
 *   - props => ()とすることにより、余計なロジックが入らないようにする
 */
import React from 'react'
import { StyledButton } from '../_shared/Button/index'
import { StyledTypography } from '../_shared/Typography/index'
import { SignInProps } from './types'

//----------------------------------
// component
//----------------------------------
export const SignIn = (props: SignInProps) => (
  //----------------------------------
  // render
  //----------------------------------
  <div className={props.className}>
    <div>
      <StyledTypography variant={'h1'}>Firebase × React</StyledTypography>
      <StyledButton
        size={'sm'}
        color={'primary'}
        onClick={() => props.signIn()}
      >
        ログインする
      </StyledButton>
    </div>
  </div>
)
