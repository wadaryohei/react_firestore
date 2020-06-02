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
export interface ButtonProps {
  children: React.ReactNode
  color: 'primary' | 'secondary' | 'cancel' | 'default' | 'border'
  size: 'lg' | 'md' | 'sm'
  className?: string
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

//----------------------------------
// component
//----------------------------------
export const ButtonDoms = (props: ButtonProps) => {
  switch (props.color) {
    case 'primary':
      return (
        <button
          className={`${props.className} ${props.size} primary`}
          onClick={e => props.onClick(e)}
        >
          {props.children}
        </button>
      )

    case 'secondary':
      return (
        <button
          className={`${props.className} ${props.size} secondary`}
          onClick={e => props.onClick(e)}
        >
          {props.children}
        </button>
      )

    case 'cancel':
      return (
        <button
          className={`${props.className} ${props.size} cancel`}
          onClick={e => props.onClick(e)}
        >
          {props.children}
        </button>
      )

    case 'border':
      return (
        <button
          className={`${props.className} ${props.size} border`}
          onClick={e => props.onClick(e)}
        >
          {props.children}
        </button>
      )

    case 'default':
      return (
        <button
          className={`${props.className} ${props.size} default`}
          onClick={e => props.onClick(e)}
        >
          {props.children}
        </button>
      )
  }
}
