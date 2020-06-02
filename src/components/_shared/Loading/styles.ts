/**
 * Style層
 * - CSSを記述する
 * - styledの引数でコンポーネントを受け取る
 * - CSSのネストが深くなったらコンポーネント分割を検討する
 */
import styled from 'styled-components'
import { LoadingDoms } from './doms'
import { Colors } from '../../../const/Colors'
import { Margin } from '../../../const/Margin'

export const Loading = styled(LoadingDoms)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999999;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.white};

  > div {
    margin-top: ${Margin.m8};
  }
`
