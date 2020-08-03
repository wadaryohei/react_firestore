import React from 'react'
import { Typography } from '../Typography'
import { Image } from '../Image'
import { UserType } from '../../../model/User/types'

//----------------------------------
// props
//----------------------------------
export interface UserProps {
  user: UserType | undefined
  firebaseUser: firebase.User | null
  className?: string
  children?: React.ReactNode
}

//----------------------------------
// component
//----------------------------------
export const User = (props: UserProps) => (
  <>
    <Image src={props.user?.photoURL} alt={props.user?.photoURL} width={120} height={120} />
    <Typography component={'p'}>{props.user?.name}</Typography>

    <div>
      {props.user?.followingCount !== undefined && (
        <Typography component={'p'}>
          フォロー / {props.user?.followingCount}
        </Typography>
      )}
      {props.user?.followerCount !== undefined && (
        <Typography component={'p'}>
          フォロワー / {props.user?.followerCount}
        </Typography>
      )}
    </div>
    {props.children}
  </>
)
