/**
 * Container層
 * - スタイルコンポーネントにデータを渡す
 * - ロジックが必要な場合は、ここに記述する
 */
import React from 'react'
import { Link } from 'react-router-dom'
import { StyledSideBarList } from './styles'
import { SideBarProps } from './types'
import { StyledButton } from '../../_shared/Button'

export const SideBar = (props: SideBarProps) => (
  //----------------------------------
  // render
  //----------------------------------
  <StyledSideBarList>
    <Link to={'/signout'}>{props.firebaseUser?.displayName}からログアウト</Link>
    <StyledButton
      size={'sm'}
      color={'cancel'}
      onClick={() => props.onOpenModal()}
    >
      アカウントを削除する
    </StyledButton>
  </StyledSideBarList>
)
