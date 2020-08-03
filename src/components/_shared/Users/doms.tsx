import React from 'react'
import { User } from '../User'
import { Button } from '../Button'
import { Box } from '@material-ui/core'
import { Margin } from '../../../const/Margin'
import { useFollowType } from '../../../hooks/useFollow'
import { UserType } from '../../../model/User/types'

//----------------------------------
// props
//----------------------------------
export interface UsersProps {
  firebaseUser: firebase.User | null
  user: UserType | undefined
  follow: useFollowType
  userLoading: boolean
  className?: string
}

//----------------------------------
// component
//----------------------------------
export const UsersComponent = (props: UsersProps) => (
  <div className={props.className}>
    <User user={props.user} firebaseUser={props.firebaseUser}>
      {/* <Box my={Margin.m8}>
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
      </Box> */}
    </User>
  </div>
)
