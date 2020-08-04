import React from 'react'
import { CircularProgress, Grid, Container, Box } from '@material-ui/core'
import { useParams, useLocation } from 'react-router-dom'
import { BaseLayout } from '../../components/_shared/BaseLayout'
import { Loading } from '../../components/_shared/Loading'
import { DeleteModal } from '../../components/_shared/DeleteModal'
import { SideBar } from '../../components/_shared/SideBar'
import { Card } from '../../components/_shared/Card'
import { Link } from '../../components/_shared/Link'
import { Button } from '../../components/_shared/Button'
import { User } from '../../components/_shared/User'
import { useFetchUsers } from '../../hooks/useFetchUsers'
import { useDelete } from '../../hooks/useDelete'
import { useModal } from '../../hooks/useModal'
import { Margin } from '../../const/Margin'
import { useUserPresenter } from './UserPresenter/UseUserPresenter'
import { useFollow } from '../../hooks/useFollow'

//----------------------------------
// props
//----------------------------------
export interface UserProps {
  firebaseUser: firebase.User | null
  className?: string
}

//----------------------------------
// component
//----------------------------------
export const UserContainer = (props: UserProps) => {
  //----------------------------------
  //  hooks
  //----------------------------------
  const { id } = useParams()
  const location = useLocation()
  const modal = useModal()
  const follow = useFollow(props.firebaseUser?.uid, id)
  const deleted = useDelete()
  const otherUser = useFetchUsers('users', id)
  const currentUser = useFetchUsers('users', props.firebaseUser?.uid)
  const presenter = useUserPresenter(
    otherUser.fetchUserData(),
    currentUser.fetchUserData()
  )

  return (
    <BaseLayout
      className={props.className}
      user={presenter.viewDatas().currentUser}
    >
      <>
        {deleted.deleteLoading() && (
          <>
            <CircularProgress />
            <Loading text={'ユーザーを削除しています'} />
          </>
        )}
        {modal.showModal() && (
          <DeleteModal modal={modal} onDeleteUser={deleted.onDeleteUser} />
        )}

        <Container maxWidth={'md'}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <SideBar>
                <Card className={'l-user-action'}>
                  <Box mb={Margin.m16}>
                    <Link to={'/signout'}>
                      {presenter.viewDatas().user?.name}からログアウト
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
              <Card className={'l-user'}>
                <User
                  ptahClassName={location.pathname}
                  user={presenter.viewDatas().user}
                  firebaseUser={props.firebaseUser}
                >
                  {id !== props.firebaseUser?.uid && (
                    <Box my={Margin.m8}>
                      {follow.isFollowing() && (
                        <Button
                          size={'sm'}
                          color={'border'}
                          onClick={() =>
                            follow.unFollow(
                              props.firebaseUser?.uid,
                              otherUser.fetchUserData()
                            )
                          }
                        >
                          フォロー中
                        </Button>
                      )}
                      {!follow.isFollowing() && (
                        <Button
                          size={'sm'}
                          color={'primary'}
                          onClick={() =>
                            follow.follow(
                              props.firebaseUser?.uid,
                              otherUser.fetchUserData()
                            )
                          }
                        >
                          フォローする
                        </Button>
                      )}
                    </Box>
                  )}
                </User>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </>
    </BaseLayout>
  )
}