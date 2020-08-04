import styled from 'styled-components'
import { BaseLayoutComponent } from './doms'
import { Colors } from '../../../const/Colors'

export const BaseLayoutStyle = styled(BaseLayoutComponent)`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: ${Colors.gray};
`
