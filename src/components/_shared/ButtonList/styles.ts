import styled from 'styled-components'
import { Margin } from '../../../const/Margin'

export const ButtonListStyle = styled('div')`
  display: flex;
  justify-content: center;
  width: 100%;

  & > button {
    width: 50%;
  }

  & > button:nth-of-type(n + 2) {
    margin-left: ${Margin.m8};
  }
`
