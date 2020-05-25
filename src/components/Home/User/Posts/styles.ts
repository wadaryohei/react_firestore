/**
 * Style層
 * - CSSを記述する
 * - styledの引数でコンポーネントを受け取る
 * - CSSのネストが深くなったらコンポーネント分割を検討する
 */
import styled from 'styled-components'
import { Posts } from './doms'
import { Margin } from '../../../../const/Margin'

export const StyledPosts = styled(Posts)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${Margin.m8};

  &:first-child {
    margin-top: 0;
  }
`
