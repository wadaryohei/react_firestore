/**
 * Container層
 * - スタイルコンポーネントにデータを渡す
 * - ロジックが必要な場合は、ここに記述する
 */
import React from 'react'
import { StyledHeader } from './styles'
import { HeaderContainerProps } from './types'
import { useFetchUsers } from '../../../hooks/useFetchUsers'

//----------------------------------
// component
//----------------------------------
export const Header = (props: HeaderContainerProps) => {
  //----------------------------------
  //  hooks
  //----------------------------------
  const fetchProfile = useFetchUsers('users', props.firebaseUser)

  //----------------------------------
  // render
  //----------------------------------
  return <StyledHeader user={fetchProfile.fetchUserData()} />
}
