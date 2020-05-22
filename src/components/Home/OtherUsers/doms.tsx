/**
 * DOM層
 * - 宣言的UIを記述する
 * - データをPropsで受け取る
 * - 出し分け以外のロジックはContainer層で書く
 *   - props => ()とすることにより、余計なロジックが入らないようにする
 */
import React from 'react'
import { StyledCardMedia } from '../../_shared/CardMedia/index'
import { StyledTypography } from '../../_shared/Typography/index'
import { StyledButton } from '../../_shared/Button/index'
import { OtherUsersProps } from './types'

//----------------------------------
// component
//----------------------------------
export const OtherUsers = (props: OtherUsersProps) => (
  <div className={props.className}>
    <StyledCardMedia
      imgSrc={props.otherUser?.photoURL}
      alt={props.otherUser?.photoURL}
    />
    <StyledTypography variant={'p'}>
      LoginName / {props.otherUser?.name}
    </StyledTypography>
    <StyledTypography variant={'p'}>
      UserId / {props.otherUser?.id}
    </StyledTypography>
    <div>
      {props.otherUser?.isFollow && (
        <StyledButton
          size={'sm'}
          color={'border'}
          onClick={() =>
            props.follow.unFollow(props.firebaseUser?.uid, props.otherUser)
          }
        >
          フォロー中
        </StyledButton>
      )}
      {!props.otherUser?.isFollow && (
        <StyledButton
          size={'sm'}
          color={'primary'}
          onClick={() =>
            props.follow.follow(props.firebaseUser?.uid, props.otherUser)
          }
        >
          フォローする
        </StyledButton>
      )}
    </div>
  </div>
)
