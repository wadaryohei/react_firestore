/**
 * Container層
 * - スタイルコンポーネントにデータを渡す
 * - ロジックが必要な場合は、ここに記述する
 */
import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Typography } from '../../components/_shared/Typography'
import { Button } from '../../components/_shared/Button'
import { AuthLayout } from '../../components/_shared/AuthLayout'

//----------------------------------
// component
//----------------------------------
export const SignInContainer = () => {
  //----------------------------------
  // hooks
  //----------------------------------
  const { signIn } = useAuth()
  //----------------------------------
  // render
  //----------------------------------
  return (
    <AuthLayout className={'signIn'}>
      <Typography variant={'h1'}>Firebase × React</Typography>
      <Button size={'sm'} color={'primary'} onClick={() => signIn()}>
        ログインする
      </Button>
    </AuthLayout>
  )
}
