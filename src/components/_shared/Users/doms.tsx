/**
 * DOM層
 * - 宣言的UIを記述する
 * - データをPropsで受け取る
 * - 出し分け以外のロジックはContainer層で書く
 *   - props => ()とすることにより、余計なロジックが入らないようにする
 */
import React from 'react'
import { User } from '../User'
import { Button } from '../Button'
import { Box } from '@material-ui/core'
import { Margin } from '../../../const/Margin'
import { useFollowProps } from '../../../hooks/useFollow'
import { UserData } from '../../../model/Datas/User/types'


//----------------------------------
// props
//----------------------------------
export interface UsersProps {
  firebaseUser: firebase.User | null
  user: UserData | undefined
  follow: useFollowProps
  userLoading: boolean
  className?: string
}

//----------------------------------
// component
//----------------------------------
export const UsersDoms = (props: UsersProps) => (
  <div className={props.className}>
    <User user={props.user} firebaseUser={props.firebaseUser}>
      <Box my={Margin.m8}>
        {props.user?.isFollow && (
          <Button
            size={'sm'}
            color={'border'}
            onClick={() =>
              props.follow.unFollow(props.firebaseUser?.uid, props.user)
            }
          >
            フォロー中
          </Button>
        )}
        {!props.user?.isFollow && (
          <Button
            size={'sm'}
            color={'primary'}
            onClick={() =>
              props.follow.follow(props.firebaseUser?.uid, props.user)
            }
          >
            フォローする
          </Button>
        )}
      </Box>
    </User>
  </div>
)
