/**
 * DOM層
 * - 宣言的UIを記述する
 * - データをPropsで受け取る
 * - 出し分け以外のロジックはContainer層で書く
 *   - props => ()とすることにより、余計なロジックが入らないようにする
 */
import React from 'react'
import { DialogTitle } from '@material-ui/core'

//----------------------------------
// props
//----------------------------------
export interface ModalHeaderProps {
  title: string
}

//----------------------------------
// component
//----------------------------------
export const ModalHeader = (props: ModalHeaderProps) => (
  //----------------------------------
  // render
  //----------------------------------
  <DialogTitle className={'title'}>{props.title}</DialogTitle>
)
