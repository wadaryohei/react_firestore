/**
 * DOM層
 * - 宣言的UIを記述する
 * - データをPropsで受け取る
 * - 出し分け以外のロジックはContainer層で書く
 *   - props => ()とすることにより、余計なロジックが入らないようにする
 */

import React from 'react'

//----------------------------------
// props
//----------------------------------
export interface TypographyProps {
  children: React.ReactNode
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  className?: string | undefined
  color?: string | undefined
}

//----------------------------------
// component
//----------------------------------
export const TypographyDoms = (props: TypographyProps) => {
  //----------------------------------
  // render
  //----------------------------------
  switch (props.variant) {
    case 'h1':
      return (
        <h1 className={`h1 ${props.className} ${props.color}`}>
          {props.children}
        </h1>
      )
    case 'h2':
      return (
        <h2 className={`h2 ${props.className} ${props.color}`}>
          {props.children}
        </h2>
      )
    case 'h3':
      return (
        <h3 className={`h3 ${props.className} ${props.color}`}>
          {props.children}
        </h3>
      )
    case 'h4':
      return (
        <h4 className={`h4 ${props.className} ${props.color}`}>
          {props.children}
        </h4>
      )
    case 'p':
      return (
        <p className={`p ${props.className} ${props.color}`}>
          {props.children}
        </p>
      )
    case 'span':
      return (
        <span className={`span ${props.className} ${props.color}`}>
          {props.children}
        </span>
      )
  }
}
