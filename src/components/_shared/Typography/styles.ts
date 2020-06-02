/**
 * Style層
 * - CSSを記述する
 * - styledの引数でコンポーネントを受け取る
 * - CSSのネストが深くなったらコンポーネント分割を検討する
 */
import styled from 'styled-components'
import { TypographyDoms } from './doms'
import { FontSize } from '../../../const/FontSize'
import { Margin } from '../../../const/Margin'
import { Colors } from '../../../const/Colors'

export const Typography = styled(TypographyDoms)`
  color: ${Colors.black};
  margin: ${Margin.m0};

  &.h1 {
    font-size: ${FontSize.h1};
  }

  &.h2 {
    font-size: ${FontSize.h2};
  }

  &.h3 {
    font-size: ${FontSize.h3};
  }

  &.h4 {
    font-size: ${FontSize.h4};
  }

  &.p {
    font-size: ${FontSize.p};
    line-height: 2;
  }

  &.span {
    font-size: ${FontSize.span};
  }

  &.white {
    color: ${Colors.white};
  }
`
