import styled from 'styled-components'
import { ButtonComponent } from './doms'
import { Colors } from '../../../const/Colors'
import { Padding } from '../../../const/Padding'
import { FontSize } from '../../../const/FontSize'
import { FontWeight } from '../../../const/FontWeight'

export const ButtonStyle = styled(ButtonComponent)`
  border: none;
  outline: none;
  font-weight: ${FontWeight.bold};
  border-radius: 4px;
  color: ${Colors.white};
  cursor: pointer;
  transition: 0.4s ease;

  &.lg {
    padding: ${Padding.p16} ${Padding.p24};
    font-size: ${FontSize.xs};
  }

  &.md {
    padding: ${Padding.p8} ${Padding.p24};
    font-size: ${FontSize.xs};
  }

  &.sm {
    padding: ${Padding.p8} ${Padding.p24};
    font-size: ${FontSize.xs};
  }

  &.primary {
    border: solid 1px ${Colors.primary};
    background-color: ${Colors.primary};

    &:hover {
      transition: 0.2s ease;
      filter: brightness(70%);
    }
  }

  &.default {
    color: ${Colors.black};
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
`
