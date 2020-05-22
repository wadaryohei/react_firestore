/**
 * Container層
 * - スタイルコンポーネントにデータを渡す
 * - ロジックが必要な場合は、ここに記述する
 */
import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { StyledSignIn } from './styles'

//----------------------------------
// component
//----------------------------------
export const SignIn = () => {
  //----------------------------------
  // hooks
  //----------------------------------
  const { signIn } = useAuth()
  //----------------------------------
  // render
  //----------------------------------
  return <StyledSignIn signIn={signIn} />
}
