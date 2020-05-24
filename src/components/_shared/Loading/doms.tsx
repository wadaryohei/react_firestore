/**
 * DOM層
 * - 宣言的UIを記述する
 * - データをPropsで受け取る
 * - 出し分け以外のロジックはContainer層で書く
 *   - props => ()とすることにより、余計なロジックが入らないようにする
 */
import React from 'react'
import { LoadingProps } from './types'
import { CircularProgress } from '@material-ui/core'

//----------------------------------
// component
//----------------------------------
export const Loading = (props: LoadingProps) => (
  //----------------------------------
  // render
  //----------------------------------
  <div className={props.className}>
    <CircularProgress />
    <div>{props.text}</div>
  </div>
)
