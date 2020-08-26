import React from 'react'
import { Typography } from '../Typography'
import { Image } from '../Image'
import { UserType } from '../../../model/User/types'

//----------------------------------
// props
//----------------------------------
export interface UserProps {
  user: UserType
  firebaseUser: firebase.User | null
  pathClassName?: string
  className?: string
  children?: React.ReactNode
}

//----------------------------------
// component
//----------------------------------
export const UserComponent = (props: UserProps) => (
  <div className={props.className}>
    <Image
      src={props.user.photoURL}
      alt={props.user.photoURL}
      width={120}
      height={120}
    />
    <Typography
      component={'p'}
      className={`userTypography name ${props.pathClassName}`}
    >
      {props.user.name}
    </Typography>

    <div>
      {props.user.followingCount !== undefined && (
        <Typography
          component={'p'}
          className={`userTypography ${props.pathClassName}`}
        >
          フォロー /{' '}
          <Typography component={'span'}>
            {props.user.followingCount}
          </Typography>
        </Typography>
      )}
      {props.user.followerCount !== undefined && (
        <Typography
          component={'p'}
          className={`userTypography ${props.pathClassName}`}
        >
          フォロワー /{' '}
          <Typography component={'span'}>
            {props.user.followerCount}
          </Typography>
        </Typography>
      )}
    </div>
    {props.children}
  </div>
)
