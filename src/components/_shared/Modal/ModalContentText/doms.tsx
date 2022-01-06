import React from 'react'
import { DialogContentText } from '@material-ui/core'

//----------------------------------
// props
//----------------------------------
export interface ModalContentTextProps {
  text?: string | undefined
}

//----------------------------------
// component
//----------------------------------
export const ModalContentTextComponent = (props: ModalContentTextProps) => <DialogContentText>{props.text}</DialogContentText>
