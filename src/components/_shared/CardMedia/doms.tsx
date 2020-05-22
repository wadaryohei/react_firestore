/**
 * DOM層
 * - 宣言的UIを記述する
 * - データをPropsで受け取る
 * - 出し分け以外のロジックはContainer層で書く
 *   - props => ()とすることにより、余計なロジックが入らないようにする
 */
import React from 'react'
import { CardMediaProps } from './types'

//----------------------------------
// component
//----------------------------------
export const CardMedia = (props: CardMediaProps) => (
  //----------------------------------
  // render
  //----------------------------------
  <img className={props.className} src={props.imgSrc} alt={props.alt} />
)
