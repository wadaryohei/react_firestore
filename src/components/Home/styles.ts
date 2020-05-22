/**
 * Style層
 * - CSSを記述する
 * - styledの引数でコンポーネントを受け取る
 * - CSSのネストが深くなったらコンポーネント分割を検討する
 */
import { Home } from './doms'
import styled from 'styled-components'
import { Margin } from '../../const/Margin'

export const StyledHome = styled(Home)`
  hr {
    margin: ${Margin.m32} 0;
  }
`
