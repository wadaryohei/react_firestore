import React from 'react'
import { CircularProgress } from '@material-ui/core'

//----------------------------------
// props
//----------------------------------
export interface LoadingProps {
  text: string
  className?: string
}

//----------------------------------
// component
//----------------------------------
export const LoadingComponent = (props: LoadingProps) => (
  <div className={props.className}>
    <CircularProgress />
    <div>{props.text}</div>
  </div>
)
