import styled from 'styled-components'
import { Margin } from '../../../const/Margin'
import { Padding } from '../../../const/Padding'
import { Colors } from '../../../const/Colors'

export const CardStyle = styled('div')`
  margin: ${Margin.m24} 0;
  padding: ${Padding.p72} ${Padding.p24};
  color: ${Colors.gray};
  background-color: ${Colors.white};
  box-shadow: 0px 3px 33px -6px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  text-align: center;
`
