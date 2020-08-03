import React from 'react'
import { Typography } from '../Typography/index'
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
    <img src={props.user?.photoURL} alt={props.user?.photoURL} />
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
