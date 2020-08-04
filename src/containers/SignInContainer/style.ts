import styled from 'styled-components'
import { SignInContainer } from './container'
import { Colors } from '../../const/Colors'
import { Margin } from '../../const/Margin'
import { FontWeight } from '../../const/FontWeight'

export const SignInContainerStyle = styled(SignInContainer)`
  .signInHeader {
    color: ${Colors.black};
  }

  .signInLead {
    color: ${Colors.black};
    font-weight: ${FontWeight.bold};
    &.bottom {
      margin-bottom: ${Margin.m16};
    }
  }
`
