import styled from 'styled-components'
import { PostFormComponent } from './doms'
import { Colors } from '../../../const/Colors'
import { BreakPoints, max } from '../../../const/BreakPoints'

export const PostFormStyle = styled(PostFormComponent)`
  width: 100%;

  .formInner {
    display: flex;
    width: 100%;
  }

  input[type='text'] {
    padding: 14px;
    border-radius: 4px 0 0 4px;
    border: none;
    width: 90%;
    font-size: 16px;

    @media ${max(BreakPoints.md)} {
      width: 90%;
    }

    &:focus {
      outline: none;
    }
  }

  input[type='submit'] {
    -webkit-box-sizing: content-box;
    -webkit-appearance: button;
    appearance: button;
    padding: 14px;
    border: none;
    border-radius: 0 4px 4px 0;
    outline: none;
    width: 10%;
    color: ${Colors.white};
    background-color: ${Colors.darkGray};
    cursor: pointer;

    @media ${max(BreakPoints.md)} {
      width: 10%;
    }

    &:disabled {
      opacity: 0.2;
    }
  }

  > p {
    color: ${Colors.cancel};
    visibility: hidden;

    &.visible {
      visibility: visible;
    }

    &.hidden {
      visibility: hidden;
    }
  }
`
