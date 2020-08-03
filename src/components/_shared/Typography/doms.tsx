import React from 'react'
import { Typography } from '@material-ui/core'

//----------------------------------
// props
//----------------------------------
export interface TypographyProps {
  className?: string
  children: React.ReactNode
  component: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  color?: string
  weight?: 'light' | 'normal' | 'bold'
}

//----------------------------------
// component
//----------------------------------
export const TypographyDoms = (props: TypographyProps) => (
  <Typography component={props.component} className={`${props.component} ${props.className} ${props.color}`}>
    {props.children}
  </Typography>
)

//----------------------------------
// defaultProps
//----------------------------------
TypographyDoms.defaultProps = {
  color: 'black',
}