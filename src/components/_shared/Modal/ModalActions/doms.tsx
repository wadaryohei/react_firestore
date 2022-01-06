import React from 'react'
import { DialogActions } from '@material-ui/core'

//----------------------------------
// props
//----------------------------------
export interface ModalActionsProps {
  children: React.ReactNode
}

//----------------------------------
// component
//----------------------------------
export const ModalActionsComponent = (props: ModalActionsProps) => <DialogActions>{props.children}</DialogActions>
