import React from 'react'
import { Header } from '../Header/index'
import { UserType } from '../../../model/User/types'

//----------------------------------
// props
//----------------------------------
export interface BaseLayoutProps {
  user: UserType
  children: React.ReactNode
  className?: string
}

//----------------------------------
// component
//----------------------------------
export const BaseLayoutComponent = (props: BaseLayoutProps) => (
  <section className={props.className}>
    <Header user={props.user} />
    {props.children}
  </section>
)
