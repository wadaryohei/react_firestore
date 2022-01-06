import React from 'react'
import { DialogContent } from '@material-ui/core'

//----------------------------------
// props
//----------------------------------
export interface ModalContentProps {
  children: React.ReactNode
}

//----------------------------------
// component
//----------------------------------
export const ModalContentComponent = (props: ModalContentProps) => <DialogContent>{props.children}</DialogContent>
