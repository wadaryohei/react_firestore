/**
 * Container層
 * - スタイルコンポーネントにデータを渡す
 * - ロジックが必要な場合は、ここに記述する
 */
import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Typography } from '../_shared/Typography'
import { Button } from '../_shared/Button'
import { SignInWrapper } from './styles'
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
    <SignInWrapper>
      <Typography variant={'h1'}>Firebase × React</Typography>
      <Box mt={Margin.m4}>
        <Button size={'sm'} color={'primary'} onClick={() => signIn()}>
          ログインする
        </Button>
      </Box>
    </SignInWrapper>
  )
}
