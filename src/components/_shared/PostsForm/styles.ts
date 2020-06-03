/**
 * Style層
 * - CSSを記述する
 * - styledの引数でコンポーネントを受け取る
 * - CSSのネストが深くなったらコンポーネント分割を検討する
 */
import styled from 'styled-components'
import { PostsFormDoms } from './doms'
import { Colors } from '../../../const/Colors'
import { Margin } from '../../../const/Margin'
import { Padding } from '../../../const/Padding'

export const PostsForm = styled(PostsFormDoms)`
  > input[type='text'] {
    padding: ${Padding.p8};
    border-radius: 4px;
    border: solid 2px ${Colors.default};
    background-color: ${Colors.default};

    &:focus {
      outline: none;
    }
  }

  > input[type='submit'] {
    padding: ${Padding.p8} ${Padding.p16};
    margin-left: ${Margin.m8};
    border: none;
    border-radius: 4px;
    outline: none;
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
