/**
 * Style層
 * - CSSを記述する
 * - styledの引数でコンポーネントを受け取る
 * - CSSのネストが深くなったらコンポーネント分割を検討する
 */
import styled from 'styled-components'
import { PostsDoms } from './doms'
import { Margin } from '../../../const/Margin'

export const Posts = styled(PostsDoms)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${Margin.m8};

  &:first-child {
    margin-top: 0;
  }
`
