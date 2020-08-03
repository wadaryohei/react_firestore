/**
 * DOM層
 * - 宣言的UIを記述する
 * - データをPropsで受け取る
 * - 出し分け以外のロジックはContainer層で書く
 *   - props => ()とすることにより、余計なロジックが入らないようにする
 */
import React from 'react'
import { Dialog } from '@material-ui/core'

//----------------------------------
// props
//----------------------------------
export interface ModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

//----------------------------------
// component
//----------------------------------
export const ModalComponent = (props: ModalProps) => (
  //----------------------------------
  // render
  //----------------------------------
  <Dialog
    className={props.className}
    open={props.open}
    onClose={props.onClose}
    PaperProps={{
      style: {
        width: '320px',
        margin: '16px',
        padding: '0'
      }
    }}
  >
    {props.children}
  </Dialog>
)
