import styled from 'styled-components'
import { PostComponent } from './doms'
import { Margin } from '../../../const/Margin'
import { Colors } from '../../../const/Colors'
import { FontWeight } from '../../../const/FontWeight'

export const PostStyle = styled(PostComponent)`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;

  .postImage {
    border-radius: 50%;
    border: solid 2px ${Colors.primary};
  }

  .contentWrapper {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    margin-left: ${Margin.m16};
  }

  .leadWrapper {
    display: flex;

    .name {
      margin-right: ${Margin.m16};
      font-weight: ${FontWeight.bold};
    }
  }

  .bodyWrapper {
    display: block;
  }

  .actionWrapper {
    margin-top: ${Margin.m8};
  }
`
