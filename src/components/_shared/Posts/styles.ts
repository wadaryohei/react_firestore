import styled from 'styled-components'
import { PostsComponent } from './doms'
import { Margin } from '../../../const/Margin'

export const PostsStyle = styled(PostsComponent)`
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
