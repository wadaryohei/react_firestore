/**
 * DOM層
 * - 宣言的UIを記述する
 * - データをPropsで受け取る
 * - 出し分け以外のロジックはContainer層で書く
 *   - props => ()とすることにより、余計なロジックが入らないようにする
 */
import React from 'react'
import { DialogActions } from '@material-ui/core'

//----------------------------------
// props
//----------------------------------
export interface ModalActionsProps {
  children: React.ReactNode
}

//----------------------------------
// component
//----------------------------------
export const ModalActions = (props: ModalActionsProps) => (
  //----------------------------------
  // render
  //----------------------------------
  <DialogActions>{props.children}</DialogActions>
)
