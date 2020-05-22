/**
 * DOM層
 * - 宣言的UIを記述する
 * - データをPropsで受け取る
 * - 出し分け以外のロジックはContainer層で書く
 *   - props => ()とすることにより、余計なロジックが入らないようにする
 */
import React from 'react'
import { Index } from '../Index/Index'
import { Route } from 'react-router-dom'
import { AppProps } from './types'

//----------------------------------
// component
//----------------------------------
export const App = (props: AppProps) => (
  <div className={props.className}>
    <Route path="/" render={() => <Index viewDatas={props.viewDatas} />} />
  </div>
)
