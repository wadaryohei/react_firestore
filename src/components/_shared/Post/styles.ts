import styled from 'styled-components'
import { PostComponent } from './doms'
import { Margin } from '../../../const/Margin'

export const PostStyle = styled(PostComponent)`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;

  img {
    border-radius: 50%;
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
      font-weight: bold;
    }
  }

  .bodyWrapper {
    display: block;
  }
`
