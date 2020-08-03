import React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '../Typography'
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
      <div>
        <Typography component={'h1'} color={'white'}>
          React × Firebase
        </Typography>
        <Link to={`/user/${props.user?.id}`}>
          <Image src={props.user?.photoURL} alt={props.user?.photoURL} width={80} height={80} />
        </Link>
      </div>
    </header>
  )
}
