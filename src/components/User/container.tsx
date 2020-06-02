/**
 * Container層
 * - スタイルコンポーネントにデータを渡す
 * - ロジックが必要な場合は、ここに記述する
 */
import React from 'react'
import { CircularProgress, Grid, Container } from '@material-ui/core'
import { Profile } from '../Home/User/Profile'
import { Layout } from '../_shared/Layout'
import { Card } from '../_shared/Card'
import { Loading } from '../_shared/Loading'
import { SideBar } from '../_shared/SideBar'
import { Link } from 'react-router-dom'
import { Button } from '../_shared/Button/styles'
import { DeleteModal } from './DeleteModal/doms'
import { useFetchUsers } from '../../hooks/useFetchUsers'
import { useModal } from '../../hooks/useModal'
import { useDelete } from '../../hooks/useDelete'

//----------------------------------
// props
//----------------------------------
export interface UserProps {
  firebaseUser: firebase.User | null
}

//----------------------------------
// component
//----------------------------------
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
    <Layout firebaseUser={props.firebaseUser}>
      <>
        {deleteLoading() && (
          <>
            <CircularProgress />
            <Loading text={'ユーザーを削除しています'} />
          </>
        )}
        {modal.showModal() && (
          <DeleteModal modal={modal} onDeleteUser={onDeleteUser} />
        )}

        <Container maxWidth={'md'}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <SideBar>
                <Card>
                  <Link to={'/signout'}>
                    {props.firebaseUser?.displayName}からログアウト
                  </Link>
                  <Button
                    size={'sm'}
                    color={'cancel'}
                    onClick={() => modal.onOpenModal()}
                  >
                    アカウントを削除する
                  </Button>
                </Card>
              </SideBar>
            </Grid>

            <Grid item xs={12} md={8}>
              <Card>
                <Profile
                  user={fetchProfile.fetchUserData()}
                  firebaseUser={props.firebaseUser}
                />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </>
    </Layout>
  )
}
