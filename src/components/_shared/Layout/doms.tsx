/**
 * DOM層
 * - 宣言的UIを記述する
 * - データをPropsで受け取る
 * - 出し分け以外のロジックはContainer層で書く
 * - props => ()とすることにより、余計なロジックが入らないようにする
 */
import React from 'react'
import { Header } from '../Header/index'
import { LayoutProps } from './types'

//----------------------------------
// component
//----------------------------------
export const Layout = (props: LayoutProps) => (
  //----------------------------------
  // render
  //----------------------------------
  <div className={props.className}>
    <Header firebaseUser={props.firebaseUser} />
    {props.children}
  </div>
)
