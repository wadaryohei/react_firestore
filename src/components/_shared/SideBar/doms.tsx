/**
 * Container層
 * - スタイルコンポーネントにデータを渡す
 * - ロジックが必要な場合は、ここに記述する
 */
import React from 'react'

//----------------------------------
// props
//----------------------------------
export interface SideBarProps {
  className?: string
  children: React.ReactNode
}

//----------------------------------
// component
//----------------------------------
export const SideBarDoms = (props: SideBarProps) => (
  //----------------------------------
  // render
  //----------------------------------
  <div className={props.className}>{props.children}</div>
)
