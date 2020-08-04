import styled from 'styled-components'
import { UserContainer } from './container'
import { Padding } from '../../const/Padding'
import { BreakPoints, max } from '../../const/BreakPoints'

export const UserContainerStyle = styled(UserContainer)`
  padding: ${Padding.p112};

  @media ${max(BreakPoints.md)} {
    padding: ${Padding.p112} 0;
  }
`
