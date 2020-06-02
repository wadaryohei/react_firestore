/**
 * Style層
 * - CSSを記述する
 * - styledの引数でコンポーネントを受け取る
 * - CSSのネストが深くなったらコンポーネント分割を検討する
 */
import styled from 'styled-components'
import { CardMediaDoms } from './doms'

export const CardMedia = styled(CardMediaDoms)`
  width: 120px;
  height: 120px;
  border-radius: 50%;
`
