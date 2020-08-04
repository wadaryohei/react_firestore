import styled from 'styled-components'
import { ModalComponent } from './doms'
import { Padding } from '../../../const/Padding'
import { FontWeight } from '../../../const/FontWeight'

export const ModalStyle = styled(ModalComponent)`
  .title {
    padding: 0 0 ${Padding.p16} 0;
    > h2 {
      font-weight: ${FontWeight.bold};
    }
  }
`
