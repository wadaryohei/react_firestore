import styled from 'styled-components'
import { HeaderComponent } from './doms'
import { Colors } from '../../../const/Colors'

export const HeaderStyle = styled(HeaderComponent)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 72px;
  line-height: 72px;
  background-color: ${Colors.darkGray};
  color: ${Colors.white};

  .headerContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    height: 72px;

    > a {
      display: flex;
      .headerImage {
        border: solid 2px ${Colors.primary};
        width: 45px;
        height: 45px;
      }
    }
  }
`
