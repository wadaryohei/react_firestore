import styled from 'styled-components'
import { UserComponent } from './doms'
import { Colors } from '../../../const/Colors'
import { BreakPoints, max } from '../../../const/BreakPoints'
import { FontWeight } from '../../../const/FontWeight'
import { FontSize } from '../../../const/FontSize'

export const UserStyle = styled(UserComponent)`
  .userTypography {
    color: ${Colors.black};

    &[class*='/'] {
      color: ${Colors.white};

      @media ${max(BreakPoints.md)} {
        font-size: ${FontSize.xs};
      }
    }

    &[class*='/user'] {
      color: ${Colors.black};

      @media ${max(BreakPoints.md)} {
        font-size: ${FontSize.xs};
      }

      span {
        color: ${Colors.black};
        font-weight: ${FontWeight.bold};
      }
    }

    &.name {
      font-weight: ${FontWeight.bold};
    }
  }
`
