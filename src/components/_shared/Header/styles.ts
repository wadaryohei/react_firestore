/**
 * Style層
 * - CSSを記述する
 * - styledの引数でコンポーネントを受け取る
 * - CSSのネストが深くなったらコンポーネント分割を検討する
 */
import styled from 'styled-components'
import { HeaderContainer } from './container'
import { Colors } from '../../../const/Colors'
import { Padding } from '../../../const/Padding'
import { BreakPoints } from '../../../const/BreakPoints'

export const Header = styled(HeaderContainer)`
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

    @media (max-width: ${BreakPoints.md}) {
      padding: 0 ${Padding.p24};
    }

    > a {
      display: flex;
      img {
        border: solid 2px ${Colors.white};
        width: 45px;
        height: 45px;
      }
    }
  }
`
