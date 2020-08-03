/**
 * Style層
 * - CSSを記述する
 * - styledの引数でコンポーネントを受け取る
 * - CSSのネストが深くなったらコンポーネント分割を検討する
 */
import styled from 'styled-components'
import { PostsFormDoms } from './doms'
import { Colors } from '../../../const/Colors'

export const PostsForm = styled(PostsFormDoms)`
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
    background-color: ${Colors.default};

    &:focus {
      outline: none;
    }
  }

  input[type='submit'] {
    padding: 14px;
    border: none;
    border-radius: 0 4px 4px 0;
    outline: none;
    width: 10%;
    color: ${Colors.white};
    background-color: ${Colors.primary};
    cursor: pointer;

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
