import React from 'react'
import { Link, LinkProps as RouterProps } from 'react-router-dom'

//----------------------------------
// props
//----------------------------------
export interface LinkProps extends RouterProps{
  className?: string
}

//----------------------------------
// component
//----------------------------------
export const LinkComponent = (props: LinkProps) => (
  <Link className={props.className} {...props}>{props.children}</Link>
)
