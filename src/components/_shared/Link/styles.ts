/**
 * Style層
 * - CSSを記述する
 * - styledの引数でコンポーネントを受け取る
 * - CSSのネストが深くなったらコンポーネント分割を検討する
 */
import styled from 'styled-components'
import { LinkDoms } from './doms'
import { Colors } from '../../../const/Colors'

export const Link = styled(LinkDoms)`
  text-decoration: none;
  color: ${Colors.gray};
`
