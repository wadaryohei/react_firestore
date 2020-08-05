import styled from 'styled-components'
import { Padding } from '../../../const/Padding'
import { Colors } from '../../../const/Colors'

export const AuthLayoutStyle = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &.signIn {
    background-color: ${Colors.white};
  }

  &.signOut {
    background-color: ${Colors.gray};
    > div {
      max-width: 340px;
      padding: ${Padding.p40} ${Padding.p24};
    }
  }
`
