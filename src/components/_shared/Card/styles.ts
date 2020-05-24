/**
 * Style層
 * - CSSを記述する
 * - styledの引数でコンポーネントを受け取る
 * - CSSのネストが深くなったらコンポーネント分割を検討する
 */
import styled from 'styled-components'
import { Card } from './doms'
import { Margin } from '../../../const/Margin'
import { Padding } from '../../../const/Padding'
import { Colors } from '../../../const/Colors'

export const StyledCard = styled(Card)`
  margin: ${Margin.m24} 0;
  padding: ${Padding.p72} ${Padding.p24};
  color: #ffffff;
  background-color: ${Colors.white};
  box-shadow: 0px 3px 33px -6px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  text-align: center;
`
