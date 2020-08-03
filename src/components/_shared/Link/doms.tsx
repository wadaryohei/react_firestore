import React from 'react'
import { Link, LinkProps } from 'react-router-dom'

//----------------------------------
// component
//----------------------------------
export const LinkComponent = (props: LinkProps) => (
  <Link {...props}>{props.children}</Link>
)
