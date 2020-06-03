/**
 * DOM層
 * - 宣言的UIを記述する
 * - データをPropsで受け取る
 * - 出し分け以外のロジックはContainer層で書く
 * - props => ()とすることにより、余計なロジックが入らないようにする
 */
import React from 'react'
import { Header } from '../Header/index'
import { UserData } from '../../../model/Datas/UserData'

//----------------------------------
// props
//----------------------------------
export interface BaseLayoutProps {
  firebaseUser: firebase.User | null
  user: UserData | undefined
  children: React.ReactNode
  className?: string
}

//----------------------------------
// component
//----------------------------------
export const BaseLayoutDoms = (props: BaseLayoutProps) => (
  //----------------------------------
  // render
  //----------------------------------
  <div className={props.className}>
    <Header user={props.user} />
    {props.children}
  </div>
)
