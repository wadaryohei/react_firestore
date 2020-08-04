import React from 'react'
import { Box } from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub'
import { Typography } from '../../components/_shared/Typography'
import { Button } from '../../components/_shared/Button'
import { AuthLayout } from '../../components/_shared/AuthLayout'
import { useAuth } from '../../hooks/useAuth'

//----------------------------------
// props
//----------------------------------
export interface SignInProps {
  className?: string
}

//----------------------------------
// component
//----------------------------------
export const SignInContainer = (props: SignInProps) => {
  //----------------------------------
  // hooks
  //----------------------------------
  const { signIn } = useAuth()

  return (
    <AuthLayout className={`${props.className} signIn`}>
      <Box>
        <a className={'signInGitIcon'} rel='noopener noreferrer' href='https://github.com/wadaryohei' target='_blank'>
          <GitHubIcon />
        </a>
      </Box>
      <Typography component={'h1'} className={'signInHeader'}>
        React × FireBase
      </Typography>
      <Typography component={'p'} className={'signInLead top'}>
        Funcitonal - SingIn / SignOut / CRUD(Posts / Follow)
      </Typography>
      <Typography component={'p'} className={'signInLead bottom'}>
        ReactとFireBase(FireStore)で作った基本的な処理
      </Typography>
      <Button size={'sm'} color={'primary'} onClick={() => signIn()}>
        ログインする
      </Button>
    </AuthLayout>
  )
}
