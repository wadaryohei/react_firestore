/**
 * DOM層
 * - 宣言的UIを記述する
 * - データをPropsで受け取る
 * - 出し分け以外のロジックはContainer層で書く
 *   - props => ()とすることにより、余計なロジックが入らないようにする
 */
import React from 'react'
import { CardMedia } from '../CardMedia/index'
import { Typography } from '../Typography/index'
import { UserData } from '../../../model/Datas/User/types'

//----------------------------------
// props
//----------------------------------
export interface UserProps {
  user: UserData | undefined
  firebaseUser: firebase.User | null
  className?: string
  children?: React.ReactNode
}

//----------------------------------
// component
//----------------------------------
export const User = (props: UserProps) => (
  //----------------------------------
  // render
  //----------------------------------
  <>
    <CardMedia imgSrc={props.user?.photoURL} alt={props.user?.photoURL} />
    <Typography variant={'p'}>LoginName / {props.user?.name}</Typography>
    <Typography variant={'p'}>UserId / {props.user?.id}</Typography>
    {props.user?.followingCount !== undefined && (
      <Typography variant={'p'}>
        フォロー / {props.user?.followingCount}
      </Typography>
    )}
    {props.user?.followerCount !== undefined && (
      <Typography variant={'p'}>
        フォロワー / {props.user?.followerCount}
      </Typography>
    )}
    {props.children}
  </>
)
