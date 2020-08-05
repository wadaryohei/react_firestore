import styled from 'styled-components'
import { UserComponent } from './doms'
import { Colors } from '../../../const/Colors'
import { BreakPoints, max } from '../../../const/BreakPoints'
import { FontWeight } from '../../../const/FontWeight'
import { FontSize } from '../../../const/FontSize'

export const UserStyle = styled(UserComponent)`
  .userTypography {
    color: ${Colors.black};

    &[class*='/home'] {
      color: ${Colors.white};

      @media ${max(BreakPoints.md)} {
        font-size: ${FontSize.xs};
      }
    }

    &.name {
      font-weight: ${FontWeight.bold};
    }
  }
`
