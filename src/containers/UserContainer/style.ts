import styled from 'styled-components'
import { UserContainer } from './container'
import { Padding } from '../../const/Padding'
import { Margin } from '../../const/Margin'
import { FontSize } from '../../const/FontSize'
import { FontWeight } from '../../const/FontWeight'
import { BreakPoints, max } from '../../const/BreakPoints'

export const UserContainerStyle = styled(UserContainer)`
  padding: ${Padding.p112};

  @media ${max(BreakPoints.md)} {
    padding: ${Padding.p112} 0;
  }

  .l-user-info {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: ${Margin.m16};

    button {
      margin-bottom: ${Margin.m8};
    }

    a {
      font-size: ${FontSize.sm};
      font-weight: ${FontWeight.bold};
      text-decoration: underline;
    }
  }
`
