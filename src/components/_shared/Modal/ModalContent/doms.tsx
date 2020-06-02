/**
 * DOM層
 * - 宣言的UIを記述する
 * - データをPropsで受け取る
 * - 出し分け以外のロジックはContainer層で書く
 *   - props => ()とすることにより、余計なロジックが入らないようにする
 */
import React from 'react'
import { DialogContent } from '@material-ui/core'

//----------------------------------
// props
//----------------------------------
export interface ModalContentProps {
  children: React.ReactNode
}

//----------------------------------
// component
//----------------------------------
export const ModalContent = (props: ModalContentProps) => (
  //----------------------------------
  // render
  //----------------------------------
  <DialogContent>{props.children}</DialogContent>
)
