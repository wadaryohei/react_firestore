/**
 * DOM層
 * - 宣言的UIを記述する
 * - データをPropsで受け取る
 * - 出し分け以外のロジックはContainer層で書く
 *   - props => ()とすることにより、余計なロジックが入らないようにする
 */
import React from 'react'
import { Modal } from '../../_shared/Modal/index'
import { ModalHeader } from '../../_shared/Modal/ModalHeader/doms'
import { ModalContent } from '../../_shared/Modal/ModalContent/doms'
import { ModalContentText } from '../../_shared/Modal/ModalContentText/doms'
import { ModalActions } from '../../_shared/Modal/ModalActions/doms'
import { ButtonList } from '../../_shared/ButtonList'
import { Button } from '../../_shared/Button'
import { useModalProps } from '../../../hooks/useModal'

export interface DeleteModalProps {
  modal: useModalProps
  onDeleteUser: () => void
}

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
        <ButtonList>
          <Button
            size={'sm'}
            color={'default'}
            onClick={() => props.modal.onCloseModal()}
          >
            キャンセルする
          </Button>
          <Button
            size={'sm'}
            color={'cancel'}
            onClick={() => props.onDeleteUser()}
          >
            削除する
          </Button>
        </ButtonList>
      </ModalActions>
    </ModalContent>
  </Modal>
)
