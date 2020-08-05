import styled from 'styled-components'
import { HomeContainer } from './container'
import { Margin } from '../../const/Margin'
import { Colors } from '../../const/Colors'
import { Padding } from '../../const/Padding'
import { BreakPoints, max } from '../../const/BreakPoints'

export const HomeContainerStyle = styled(HomeContainer)`
  .l-wrapper {
    width: 100%;
    height: 100%;
  }

  .l-user {
    position: fixed;
    top: ${Margin.m112};
    left: 0;
    width: 24%;
    text-align: center;

    @media ${max(BreakPoints.md)} {
      padding: 0 ${Padding.p16};
    }
  }

  .l-timeline {
    width: 76%;
    margin-left: 24%;
    border-left: solid 1px ${Colors.border};
    overflow-y: scroll;

    .l-timeline-inner {
      padding: ${Padding.p112} 16px 16px;

      .l-timeline-post {
        border-bottom: solid 1px ${Colors.border};
        padding-bottom: ${Padding.p24};
      }
    }
  }
`
