import React from 'react'
import { Box } from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub'
import { Typography } from '../../components/_shared/Typography'
import { Button } from '../../components/_shared/Button'
import { AuthLayout } from '../../components/_shared/AuthLayout'
import { useAuth } from '../../hooks/useAuth'
import { ReactPic, FirebasePic} from '../../const/Images'

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
      <Box className={'signInServicesLogo'}>
        <ReactPic height={120} />
        <FirebasePic  height={120}/>
      </Box>
      <Box>
        <a className={'signInGitIcon'} rel='noopener noreferrer' href='https://github.com/wadaryohei/react_firestore' target='_blank'>
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
        ReactとFireBase(FireStore)で作った基本処理
      </Typography>
      <Button size={'sm'} color={'primary'} onClick={() => signIn()}>
        ログインする
      </Button>
    </AuthLayout>
  )
}
