/**
 * Container層
 * - スタイルコンポーネントにデータを渡す
 * - ロジックが必要な場合は、ここに記述する
 */
import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useHistory } from 'react-router-dom'
import { Box } from '@material-ui/core'
import { Margin } from '../../const/Margin'
import { Card } from '../../components/_shared/Card'
import { Typography } from '../../components/_shared/Typography'
import { Button } from '../../components/_shared/Button'
import { SignOutWrapper } from './styles'

//----------------------------------
// component
//----------------------------------
export const SignOut = () => {
  //----------------------------------
  // hooks
  //----------------------------------
  const auth = useAuth()
  const history = useHistory()
  //----------------------------------
  // render
  //----------------------------------
  return (
    <SignOutWrapper>
      <Card>
        <Typography variant={'h1'}>React × Firebase</Typography>
        <Box my={Margin.m16}>
          <Typography variant={'h3'}>
            React × Firebaseからログアウトしますか？
          </Typography>
        </Box>

        <Box my={Margin.m16}>
          <Typography variant={'p'}>
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
    </SignOutWrapper>
  )
}
