import React from 'react'
import { Container } from '@material-ui/core'
import { Typography } from '../Typography'
import { Link } from '../Link'
import { Image } from '../Image'
import { UserType } from '../../../model/User/types'

//----------------------------------
// props
//----------------------------------
export interface HeaderProps {
  user: UserType | undefined
  className?: string
}

//----------------------------------
// component
//----------------------------------
export const HeaderComponent = (props: HeaderProps) => {
  return (
    <header className={props.className}>
      <Container className={'headerContainer'} maxWidth={'md'}>
        <Link to={'/'}>
          <Typography component={'h1'} color={'white'}>
            React × Firebase
          </Typography>
        </Link>
        <Link to={`/user/${props.user?.id}`}>
          <Image
            className={'headerImage'}
            src={props.user?.photoURL}
            alt={props.user?.photoURL}
            width={80}
            height={80}
          />
        </Link>
      </Container>
    </header>
  )
}
