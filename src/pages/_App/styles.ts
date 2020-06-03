/**
 * Style層
 * - CSSを記述する
 * - styledの引数でコンポーネントを受け取る
 * - CSSのネストが深くなったらコンポーネント分割を検討する
 */
import styled from 'styled-components'
import { Padding } from '../../const/Padding'

export const AppWrapper = styled('div')`
  width: 100%;
  height: 100%;
  padding: ${Padding.p24};
`
