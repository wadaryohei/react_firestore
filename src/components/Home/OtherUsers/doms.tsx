/**
 * DOM層
 * - 宣言的UIを記述する
 * - データをPropsで受け取る
 * - 出し分け以外のロジックはContainer層で書く
 *   - props => ()とすることにより、余計なロジックが入らないようにする
 */
import React from 'react'
import { CardMedia } from '../../_shared/CardMedia/index'
import { Typography } from '../../_shared/Typography/index'
import { Button } from '../../_shared/Button/index'
import { Box } from '@material-ui/core'
import { Margin } from '../../../const/Margin'
import { useFollowProps } from '../../../hooks/useFollow'
import { OtherUsersData } from '../../../model/Datas/OtherUsersData'

//----------------------------------
// props
//----------------------------------
export interface OtherUsersProps {
  firebaseUser: firebase.User | null
  otherUser: OtherUsersData | undefined
  follow: useFollowProps
  userLoading: boolean
  className?: string
}

//----------------------------------
// component
//----------------------------------
export const OtherUsersDoms = (props: OtherUsersProps) => (
  <div className={props.className}>
    <CardMedia
      imgSrc={props.otherUser?.photoURL}
      alt={props.otherUser?.photoURL}
    />
    <Typography variant={'p'}>LoginName / {props.otherUser?.name}</Typography>
    <Typography variant={'p'}>UserId / {props.otherUser?.id}</Typography>
    <div>
      <Box my={Margin.m8}>
        {props.otherUser?.isFollow && (
          <Button
            size={'sm'}
            color={'border'}
            onClick={() =>
              props.follow.unFollow(props.firebaseUser?.uid, props.otherUser)
            }
          >
            フォロー中
          </Button>
        )}
        {!props.otherUser?.isFollow && (
          <Button
            size={'sm'}
            color={'primary'}
            onClick={() =>
              props.follow.follow(props.firebaseUser?.uid, props.otherUser)
            }
          >
            フォローする
          </Button>
        )}
      </Box>
    </div>
  </div>
)
