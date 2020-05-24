/**
 * Style層
 * - CSSを記述する
 * - styledの引数でコンポーネントを受け取る
 * - CSSのネストが深くなったらコンポーネント分割を検討する
 */
import styled from 'styled-components'
import { Button } from './doms'
import { Colors } from '../../../const/Colors'
import { Padding } from '../../../const/Padding'
import { FontSize } from '../../../const/FontSize'

export const StyledButton = styled(Button)`
  border: none;
  outline: none;
  font-weight: bold;
  border-radius: 4px;
  color: ${Colors.white};
  cursor: pointer;
  transition: 0.4s ease;

  &.lg {
    padding: ${Padding.p12} ${Padding.p24};
    font-size: ${FontSize.lg};
  }

  &.md {
    padding: ${Padding.p8} ${Padding.p24};
    font-size: ${FontSize.md};
  }

  &.sm {
    padding: ${Padding.p6} ${Padding.p24};
    font-size: ${FontSize.sm};
  }

  &.primary {
    border: solid 1px ${Colors.primary};
    background-color: ${Colors.primary};

    &:hover {
      transition: 0.2s ease;
      filter: brightness(70%);
    }
  }

  &.secondary {
    border: solid 1px ${Colors.secondary};
    background-color: ${Colors.secondary};

    &:hover {
      transition: 0.2s ease;
      filter: brightness(70%);
    }
  }

  &.cancel {
    border: solid 1px ${Colors.cancel};
    background-color: ${Colors.cancel};

    &:hover {
      transition: 0.2s ease;
      filter: brightness(70%);
    }
  }

  &.border {
    color: ${Colors.primary};
    border: solid 1px ${Colors.primary};
    background-color: ${Colors.white};
  }

  &.default {
    border: solid 1px ${Colors.default};
    background-color: ${Colors.default};

    &:hover {
      transition: 0.2s ease;
      filter: brightness(70%);
    }
  }
`
