/**
 * DOM層
 * - 宣言的UIを記述する
 * - データをPropsで受け取る
 * - 出し分け以外のロジックはContainer層で書く
 *   - props => ()とすることにより、余計なロジックが入らないようにする
 */
import React from 'react'
import { DeleteModalProps } from './types'
import { Modal } from '../../_shared/Modal/doms'
import { ModalHeader } from '../../_shared/Modal/ModalHeader/doms'
import { ModalContent } from '../../_shared/Modal/ModalContent/doms'
import { ModalContentText } from '../../_shared/Modal/ModalContentText/doms'
import { ModalActions } from '../../_shared/Modal/ModalActions/doms'
import { StyledButtonList } from '../../_shared/ButtonList'
import { StyledButton } from '../../_shared/Button'

//----------------------------------
// component
//----------------------------------
export const DeleteModal = (props: DeleteModalProps) => (
  //----------------------------------
  // render
  //----------------------------------
  <Modal open={props.modal.showModal()} onClose={props.modal.onCloseModal}>
    <ModalContent>
      <ModalHeader title={'アカウントを削除しますか？'} />
      <ModalContentText
        text={'投稿やフォロー情報などの全てのデータが削除されます。'}
      />
      <ModalActions>
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
      </ModalActions>
    </ModalContent>
  </Modal>
)
