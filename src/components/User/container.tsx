/**
 * Container層
 * - スタイルコンポーネントにデータを渡す
 * - ロジックが必要な場合は、ここに記述する
 */
import React from 'react'
import { useFetchUsers } from '../../hooks/useFetchUsers'
import { useModal } from '../../hooks/useModal'
import { useDelete } from '../../hooks/useDelete'
import { CircularProgress, Grid, Container } from '@material-ui/core'
import { Profile } from '../Home/User/Profile'
import { DeleteModal } from './DeleteModal/doms'
import { StyledLayout } from '../_shared/Layout'
import { StyledCard } from '../_shared/Card'
import { StyledLoading } from '../_shared/Loading'
import { UserProps } from './types'
import { SideBar } from './SideBar'

export const User = (props: UserProps) => {
  //----------------------------------
  //  hooks
  //----------------------------------
  const fetchProfile = useFetchUsers('users', props.firebaseUser)
  const { onDeleteUser, deleteLoading } = useDelete()
  const modal = useModal()

  //----------------------------------
  // render
  //----------------------------------
  return (
    <StyledLayout firebaseUser={props.firebaseUser}>
      <>
        {deleteLoading() && (
          <>
            <CircularProgress />
            <StyledLoading text={'ユーザーを削除しています'} />
          </>
        )}
        {modal.showModal() && (
          <DeleteModal modal={modal} onDeleteUser={onDeleteUser} />
        )}

        <Container maxWidth={'md'}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <StyledCard>
                <SideBar
                  firebaseUser={props.firebaseUser}
                  onOpenModal={modal.onOpenModal}
                />
              </StyledCard>
            </Grid>

            <Grid item xs={12} md={8}>
              <StyledCard>
                <Profile
                  user={fetchProfile.fetchUserData()}
                  firebaseUser={props.firebaseUser}
                />
              </StyledCard>
            </Grid>
          </Grid>
        </Container>
      </>
    </StyledLayout>
  )
}
