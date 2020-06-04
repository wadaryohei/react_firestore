/**
 * Container層
 * - スタイルコンポーネントにデータを渡す
 * - ロジックが必要な場合は、ここに記述する
 */
import React from 'react'
import { CircularProgress, Grid, Container, Box } from '@material-ui/core'
import { BaseLayout } from '../../components/_shared/BaseLayout'
import { Loading } from '../../components/_shared/Loading'
import { DeleteModal } from '../../components/_shared/DeleteModal/doms'
import { SideBar } from '../../components/_shared/SideBar'
import { Card } from '../../components/_shared/Card'
import { Link } from '../../components/_shared/Link'
// import { Link } from 'react-router-dom'
import { Button } from '../../components/_shared/Button'
import { User } from '../../components/_shared/User'
import { useFetchUsers } from '../../hooks/useFetchUsers'
import { useDelete } from '../../hooks/useDelete'
import { useModal } from '../../hooks/useModal'
import { useUserPresenter } from './UserPresenter/UseUserPresenter'
import { Margin } from '../../const/Margin'

//----------------------------------
// props
//----------------------------------
export interface UserProps {
  firebaseUser: firebase.User | null
}

//----------------------------------
// component
//----------------------------------
export const UserContainer = (props: UserProps) => {
  //----------------------------------
  //  hooks
  //----------------------------------
  const fetchProfile = useFetchUsers('users', props.firebaseUser)
  const { onDeleteUser, deleteLoading } = useDelete()
  const modal = useModal()
  const presenter = useUserPresenter(fetchProfile.fetchUserData())

  //----------------------------------
  // render
  //----------------------------------
  return (
    <BaseLayout
      firebaseUser={props.firebaseUser}
      user={presenter.viewDatas().user}
    >
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
                  <Box mb={Margin.m16}>
                    <Link to={'/signout'}>
                      {props.firebaseUser?.displayName}からログアウト
                    </Link>
                  </Box>
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
                <User
                  user={fetchProfile.fetchUserData()}
                  firebaseUser={props.firebaseUser}
                />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </>
    </BaseLayout>
  )
}
