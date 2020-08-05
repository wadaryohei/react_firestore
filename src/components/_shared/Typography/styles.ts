import styled from 'styled-components'
import { TypographyComponent } from './doms'
import { Margin } from '../../../const/Margin'
import { Colors } from '../../../const/Colors'
import { FontSize } from '../../../const/FontSize'
import { FontWeight } from '../../../const/FontWeight'

export const TypographyStyle = styled(TypographyComponent)`
  color: ${Colors.white};
  margin: ${Margin.m0};

  &.h1 {
    font-size: ${FontSize.lg};
    font-weight: ${FontWeight.bold};
  }

  &.h2 {
    font-size: ${FontSize.md};
  }

  &.h3 {
    font-size: ${FontSize.md};
  }

  &.h4 {
    font-size: ${FontSize.sm};
  }

  &.p {
    font-size: ${FontSize.sm};
    line-height: 2;
  }

  &.span {
    font-size: ${FontSize.xs};
  }

  &.white {
    color: ${Colors.white};
  }
`
