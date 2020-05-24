/**
 * Style層
 * - CSSを記述する
 * - styledの引数でコンポーネントを受け取る
 * - CSSのネストが深くなったらコンポーネント分割を検討する
 */
import styled from 'styled-components'
import { Margin } from '../../../const/Margin'

export const StyledButtonList = styled('div')`
  display: flex;
  justify-content: center;
  width: 100%;

  & > button {
    width: 50%;
  }

  & > button:nth-of-type(n + 2) {
    margin-left: ${Margin.m8};
  }
`
