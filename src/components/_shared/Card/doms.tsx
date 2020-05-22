/**
 * DOM層
 * - 宣言的UIを記述する
 * - データをPropsで受け取る
 * - 出し分け以外のロジックはContainer層で書く
 *   - props => ()とすることにより、余計なロジックが入らないようにする
 */
import React from 'react'
import { CardProps } from './types'

//----------------------------------
// component
//----------------------------------
export const Card = (props: CardProps) => (
  //----------------------------------
  // render
  //----------------------------------
  <div className={props.className}>{props.children}</div>
)
