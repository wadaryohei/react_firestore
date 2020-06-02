import { useState } from 'react'

//----------------------------------
export interface useModalProps {
  showModal: () => boolean
  onOpenModal: () => void
  onCloseModal: () => void
}

//----------------------------------
// hooks
//----------------------------------
export const useModal = (): useModalProps => {
  const [_showModal, _setShowModal] = useState<boolean>(false)

  /**
   * モーダルの開閉状態を返す
   */
  const showModal = (): boolean => {
    return _showModal
  }

  /**
   * モーダルを開くイベント
   */
  const onOpenModal = (): void => {
    _setShowModal(true)
  }

  /**
   * モーダルを閉じるイベント
   */
  const onCloseModal = (): void => {
    _setShowModal(false)
  }
  return { showModal, onOpenModal, onCloseModal }
}
