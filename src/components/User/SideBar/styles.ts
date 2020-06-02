/**
 * Style層
 * - CSSを記述する
 * - styledの引数でコンポーネントを受け取る
 * - CSSのネストが深くなったらコンポーネント分割を検討する
 */
import styled from 'styled-components'
import { Padding } from '../../../const/Padding'
import { Colors } from '../../../const/Colors'
import { Margin } from '../../../const/Margin'

export const StyledSideBarList = styled('div')`
  a {
    font-weight: bold;
    display: block;
    padding: ${Padding.p16} 0;
    margin-bottom: ${Margin.m8};
    text-decoration: none;
    color: ${Colors.gray};
    transition: all 0.4 ease;

    &:hover {
      transition: all 0.2 ease;
      opacity: 0.4;
    }
  }
`
