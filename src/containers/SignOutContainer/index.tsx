import React from 'react'
import { Box } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { Card } from '../../components/_shared/Card'
import { Typography } from '../../components/_shared/Typography'
import { Button } from '../../components/_shared/Button'
import { AuthLayout } from '../../components/_shared/AuthLayout'
import { Margin } from '../../const/Margin'
import { useAuth } from '../../hooks/useAuth'

//----------------------------------
// component
//----------------------------------
export const SignOutContainer = () => {
  //----------------------------------
  // hooks
  //----------------------------------
  const auth = useAuth()
  const history = useHistory()

  return (
    <AuthLayout className={'signOut'}>
      <Card>
        <Typography component={'h1'}>React × Firebase</Typography>
        <Box my={Margin.m16}>
          <Typography component={'h3'}>
            React × Firebaseからログアウトしますか？
          </Typography>
        </Box>

        <Box my={Margin.m16}>
          <Typography component={'p'}>
            いつでもログインし直すことができます。
            別アカウントでログインする場合はログイン画面で別アカウントの情報を入力してログインしてください。
          </Typography>
        </Box>
        <Box display={'flex'} justifyContent={'center'}>
          <Box my={Margin.m8} mx={Margin.m4}>
            <Button
              size={'sm'}
              color={'default'}
              onClick={() => history.goBack()}
            >
              キャンセルする
            </Button>
          </Box>
          <Box my={Margin.m8} mx={Margin.m4}>
            <Button
              size={'sm'}
              color={'primary'}
              onClick={() => auth.signOut()}
            >
              ログアウトする
            </Button>
          </Box>
        </Box>
      </Card>
    </AuthLayout>
  )
}
