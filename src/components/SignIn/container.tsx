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
import { Margin } from '../../const/Margin'
import { Box } from '@material-ui/core'

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
      <Box mt={Margin.m4}>
        <StyledButton size={'sm'} color={'primary'} onClick={() => signIn()}>
          ログインする
        </StyledButton>
      </Box>
    </StyledSignIn>
  )
}
