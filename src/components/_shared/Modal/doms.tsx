/**
 * DOM層
 * - 宣言的UIを記述する
 * - データをPropsで受け取る
 * - 出し分け以外のロジックはContainer層で書く
 *   - props => ()とすることにより、余計なロジックが入らないようにする
 */
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'
import { StyledButton } from '../Button'
import { StyledButtonList } from '../ButtonList'
import { ModalProps } from './types'

//----------------------------------
// component
//----------------------------------
export const Modal = (props: ModalProps) => (
  //----------------------------------
  // render
  //----------------------------------
  <Dialog
    className={`${props.className} modal`}
    maxWidth={'lg'}
    open={props.modal.showModal()}
    onClose={props.modal.onOpenModal}
    PaperProps={{
      style: {
        width: '320px',
        margin: '16px',
        padding: '0'
      }
    }}
  >
    <DialogContent>
      <DialogTitle className={'title'}>アカウントを削除しますか？</DialogTitle>
      <DialogContentText>
        投稿やフォロー情報などの全てのデータが削除されます。
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <StyledButtonList>
        <StyledButton
          size={'sm'}
          color={'default'}
          onClick={() => props.modal.onCloseModal()}
        >
          キャンセルする
        </StyledButton>
        <StyledButton
          size={'sm'}
          color={'cancel'}
          onClick={() => props.onDeleteUser()}
        >
          削除する
        </StyledButton>
      </StyledButtonList>
    </DialogActions>
  </Dialog>
)
