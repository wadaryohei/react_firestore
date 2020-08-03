/**
 * Style層
 * - CSSを記述する
 * - styledの引数でコンポーネントを受け取る
 * - CSSのネストが深くなったらコンポーネント分割を検討する
 */
import styled from 'styled-components'
import { BaseLayoutDoms } from './doms'

export const BaseLayout = styled(BaseLayoutDoms)`
  width: 100%;
  height: 100%;
  display: flex;
`
