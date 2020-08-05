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
export const SideBarComponent = (props: SideBarProps) => (
  <div className={props.className}>{props.children}</div>
)
