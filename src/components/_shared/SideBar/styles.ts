/**
 * Style層
 * - CSSを記述する
 * - styledの引数でコンポーネントを受け取る
 * - CSSのネストが深くなったらコンポーネント分割を検討する
 */
import styled from 'styled-components'
import { SideBarDoms } from './doms'

export const SideBar = styled(SideBarDoms)`
  margin: 0;
`
