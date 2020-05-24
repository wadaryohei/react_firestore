/**
 * Container層
 * - スタイルコンポーネントにデータを渡す
 * - ロジックが必要な場合は、ここに記述する
 */
import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { StyledTypography } from '../_shared/Typography'
import { StyledButton } from '../_shared/Button'
import { StyledSignIn } from './styles'

//----------------------------------
// component
//----------------------------------
export const SignIn = () => {
  //----------------------------------
  // hooks
  //----------------------------------
  const { signIn } = useAuth()
  //----------------------------------
  // render
  //----------------------------------
  return (
    <StyledSignIn>
      <StyledTypography variant={'h1'}>Firebase × React</StyledTypography>
      <StyledButton size={'sm'} color={'primary'} onClick={() => signIn()}>
        ログインする
      </StyledButton>
    </StyledSignIn>
  )
}
