/**
 * DOM層
 * - 宣言的UIを記述する
 * - データをPropsで受け取る
 * - 出し分け以外のロジックはContainer層で書く
 *   - props => ()とすることにより、余計なロジックが入らないようにする
 */
import React from 'react'
import { CardMedia } from '../../../_shared/CardMedia/index'
import { Typography } from '../../../_shared/Typography/index'
import { ProfileProps } from './types'

//----------------------------------
// component
//----------------------------------
export const Profile = (props: ProfileProps) => (
  //----------------------------------
  // render
  //----------------------------------
  <>
    <CardMedia imgSrc={props.user?.photoURL} alt={props.user?.photoURL} />
    <Typography variant={'p'}>LoginName / {props.user?.name}</Typography>
    <Typography variant={'p'}>UserId / {props.firebaseUser?.uid}</Typography>
  </>
)
