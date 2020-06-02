/**
 * DOM層
 * - 宣言的UIを記述する
 * - データをPropsで受け取る
 * - 出し分け以外のロジックはContainer層で書く
 *   - props => ()とすることにより、余計なロジックが入らないようにする
 */
import React from 'react'
import { DialogContentText } from '@material-ui/core'

//----------------------------------
// props
//----------------------------------
export interface ModalContentTextProps {
  text?: string | undefined
}

//----------------------------------
// component
//----------------------------------
export const ModalContentText = (props: ModalContentTextProps) => (
  //----------------------------------
  // render
  //----------------------------------
  <DialogContentText>{props.text}</DialogContentText>
)
