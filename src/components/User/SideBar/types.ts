export interface SideBarProps {
  firebaseUser: firebase.User | null
  className?: string
  onOpenModal: () => void
}
