/**
 * Style層
 * - CSSを記述する
 * - styledの引数でコンポーネントを受け取る
 * - CSSのネストが深くなったらコンポーネント分割を検討する
 */
import styled from 'styled-components'
import { LayoutDoms } from './doms'
import { Padding } from '../../../const/Padding'

export const Layout = styled(LayoutDoms)`
  padding: ${Padding.p72} 0;
`
