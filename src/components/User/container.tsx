/**
 * Container層
 * - スタイルコンポーネントにデータを渡す
 * - ロジックが必要な場合は、ここに記述する
 */
import React from 'react'
import { UserContainerProps } from './types'
import { useFetchUsers } from '../../hooks/useFetchUsers'
import { useAuth } from '../../hooks/useAuth'
import { useModal } from '../../hooks/useModal'
import { Container, Box } from '@material-ui/core'
import { StyledModal } from '../_shared/Modal'
import { StyledLayout } from '../_shared/Layout'
import { StyledCard } from '../_shared/Card'
import { Profile } from '../Home/User/Profile'
import { StyledButton } from '../_shared/Button'
import { Margin } from '../../const/Margin'

export const User = (props: UserContainerProps) => {
  //----------------------------------
  //  hooks
  //----------------------------------
  const fetchProfile = useFetchUsers('users', props.firebaseUser)
  const { signOut } = useAuth()
  const modal = useModal()

  //----------------------------------
  // render
  //----------------------------------
  return (
    <StyledLayout firebaseUser={props.firebaseUser}>
      {modal.showModal() && <StyledModal modal={modal} />}
      <Container maxWidth={'md'}>
        <StyledCard>
          <Profile
            user={fetchProfile.fetchUserData()}
            firebaseUser={props.firebaseUser}
          />
          <Box my={Margin.m8}>
            <StyledButton
              size={'sm'}
              color={'primary'}
              onClick={() => signOut()}
            >
              ログアウトする
            </StyledButton>
          </Box>
          <Box my={Margin.m4}>
            <StyledButton
              size={'sm'}
              color={'cancel'}
              onClick={() => modal.onOpenModal()}
            >
              アカウントを削除する
            </StyledButton>
          </Box>
        </StyledCard>
      </Container>
    </StyledLayout>
  )
}
