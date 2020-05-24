import { Modal } from '../../../hooks/useModal'

export interface ModalProps {
  modal: Modal
  onDeleteUser: () => void
  className?: string
}
