/**
 * Style層
 * - CSSを記述する
 * - styledの引数でコンポーネントを受け取る
 * - CSSのネストが深くなったらコンポーネント分割を検討する
 */
import styled from 'styled-components'
import { UsersDoms } from './doms'
import { Margin } from '../../../const/Margin'

export const Users = styled(UsersDoms)`
  margin-top: ${Margin.m40};
`
