import React from 'react'
import { DialogTitle } from '@material-ui/core'

//----------------------------------
// props
//----------------------------------
export interface ModalHeaderProps {
  title: string
}

//----------------------------------
// component
//----------------------------------
export const ModalHeaderComponent = (props: ModalHeaderProps) => <DialogTitle className={'title'}>{props.title}</DialogTitle>
