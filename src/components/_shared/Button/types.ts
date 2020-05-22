export interface ButtonProps {
  children: React.ReactNode
  color: 'primary' | 'secondary' | 'cancel' | 'default' | 'border'
  size: 'lg' | 'md' | 'sm'
  className?: string
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}
