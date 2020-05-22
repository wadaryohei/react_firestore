/**
 * Container層
 * - スタイルコンポーネントにデータを渡す
 * - ロジックが必要な場合は、ここに記述する
 */
import React from 'react'
import { StyledHeader } from './styles'

//----------------------------------
// component
//----------------------------------
export const Header = () => {
  //----------------------------------
  // render
  //----------------------------------
  return <StyledHeader />
}
