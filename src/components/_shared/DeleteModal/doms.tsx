import React from 'react'
import { Modal } from '../Modal/index'
import { ModalHeader } from '../Modal/ModalHeader'
import { ModalContent } from '../Modal/ModalContent'
import { ModalContentText } from '../Modal/ModalContentText'
import { ModalActions } from '../Modal/ModalActions'
import { ButtonList } from '../ButtonList'
import { Button } from '../Button'
import { useModalType } from '../../../hooks/useModal'

//----------------------------------
// props
//----------------------------------
export interface DeleteModalProps {
  modal: useModalType
  onDeleteUser: () => void
}

//----------------------------------
// component
//----------------------------------
export const DeleteModalComponent = (props: DeleteModalProps) => (
  <Modal open={props.modal.showModal()} onClose={props.modal.onCloseModal}>
    <ModalContent>
      <ModalHeader title={'アカウントを削除しますか？'} />
      <ModalContentText text={'投稿やフォロー情報などの全てのデータが削除されます。'} />
      <ModalActions>
        <ButtonList>
          <Button size={'sm'} color={'default'} onClick={() => props.modal.onCloseModal()}>
            キャンセルする
          </Button>
          <Button size={'sm'} color={'cancel'} onClick={() => props.onDeleteUser()}>
            削除する
          </Button>
        </ButtonList>
      </ModalActions>
    </ModalContent>
  </Modal>
)
