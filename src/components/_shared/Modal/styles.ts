/**
 * Style層
 * - CSSを記述する
 * - styledの引数でコンポーネントを受け取る
 * - CSSのネストが深くなったらコンポーネント分割を検討する
 */
import styled from 'styled-components'
import { Modal } from './doms'
import { Padding } from '../../../const/Padding'

export const StyledModal = styled(Modal)`
  .title {
    padding: 0 0 ${Padding.p16} 0;
    > h2 {
      font-weight: bold;
    }
  }
`
