import React from 'react'

//----------------------------------
// props
//----------------------------------
export interface MainProps {
  children: React.ReactNode
  className?: string
}

//----------------------------------
// component
//----------------------------------
export const MainComponent = (props: MainProps) => (
  <main className={props.className}>{props.children}</main>
)
