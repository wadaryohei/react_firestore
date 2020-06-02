/**
 * Container層
 * - スタイルコンポーネントにデータを渡す
 * - ロジックが必要な場合は、ここに記述する
 */
import React from 'react'
import { Box } from '@material-ui/core'
import { Margin } from '../../const/Margin'
import { StyledButton } from '../_shared/Button'
import { useAuth } from '../../hooks/useAuth'
import { useHistory } from 'react-router-dom'
import { StyledSignOut } from './styles'
import { StyledCard } from '../_shared/Card/styles'
import { StyledTypography } from '../_shared/Typography'

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
    <StyledSignOut>
      <StyledCard>
        <StyledTypography variant={'h1'}>React × Firebase</StyledTypography>
        <Box my={Margin.m16}>
          <StyledTypography variant={'h3'}>
            React × Firebaseからログアウトしますか？
          </StyledTypography>
        </Box>

        <Box my={Margin.m16}>
          <StyledTypography variant={'p'}>
            いつでもログインし直すことができます。
            別アカウントでログインする場合はログイン画面で別アカウントの情報を入力してログインしてください。
          </StyledTypography>
        </Box>
        <Box display={'flex'} justifyContent={'center'}>
          <Box my={Margin.m8} mx={Margin.m4}>
            <StyledButton
              size={'sm'}
              color={'default'}
              onClick={() => history.goBack()}
            >
              キャンセルする
            </StyledButton>
          </Box>
          <Box my={Margin.m8} mx={Margin.m4}>
            <StyledButton
              size={'sm'}
              color={'primary'}
              onClick={() => auth.signOut()}
            >
              ログアウトする
            </StyledButton>
          </Box>
        </Box>
      </StyledCard>
    </StyledSignOut>
  )
}
