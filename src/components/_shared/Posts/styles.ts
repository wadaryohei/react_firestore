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
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;

  img {
    border-radius: 50%;
  }

  .contentWrapper {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    margin-left: ${Margin.m16};
  }

  .leadWrapper {
    display: flex;

    .name {
      margin-right: ${Margin.m16};
      font-weight: bold;
    }
  }

  .bodyWrapper {
    display: block;
  }
`
