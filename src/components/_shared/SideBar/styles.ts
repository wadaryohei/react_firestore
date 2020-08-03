/**
 * Style層
 * - CSSを記述する
 * - styledの引数でコンポーネントを受け取る
 * - CSSのネストが深くなったらコンポーネント分割を検討する
 */
import styled from 'styled-components'
import { SideBarComponent } from './doms'

export const SideBarStyle = styled(SideBarComponent)`
  margin: 0;
`
