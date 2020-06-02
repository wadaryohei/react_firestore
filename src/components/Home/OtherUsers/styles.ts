/**
 * Style層
 * - CSSを記述する
 * - styledの引数でコンポーネントを受け取る
 * - CSSのネストが深くなったらコンポーネント分割を検討する
 */
import styled from 'styled-components'
import { OtherUsersDoms } from './doms'
import { Margin } from '../../../const/Margin'

export const OtherUsers = styled(OtherUsersDoms)`
  margin-top: ${Margin.m40};
`
