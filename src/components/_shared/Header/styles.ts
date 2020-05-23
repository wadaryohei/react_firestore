/**
 * Style層
 * - CSSを記述する
 * - styledの引数でコンポーネントを受け取る
 * - CSSのネストが深くなったらコンポーネント分割を検討する
 */
import styled from 'styled-components'
import { Header } from './doms'
import { Colors } from '../../../const/Colors'

export const StyledHeader = styled(Header)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 72px;
  line-height: 72px;
  background-color: ${Colors.primary};
  color: ${Colors.white};

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 960px;
    margin: 0 auto;

    > img {
      width: 45px;
      height: 45px;
    }
  }
`
