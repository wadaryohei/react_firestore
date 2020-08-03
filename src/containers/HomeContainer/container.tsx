import React from 'react'
import { Box } from '@material-ui/core'
import { BaseLayout } from '../../components/_shared/BaseLayout'
import { Posts } from '../../components/_shared/Posts'
import { PostsForm } from '../../components/_shared/PostsForm'
import { User } from '../../components/_shared/User/doms'
import { SideBar } from '../../components/_shared/SideBar'
import { Main } from '../../components/_shared/Main'
import { Margin } from '../../const/Margin'
import { Padding } from '../../const/Padding'
import { useForm } from '../../hooks/useForm'
import { useFetchUsers } from '../../hooks/useFetchUsers'
import { useFetchPosts } from '../../hooks/useFetchPosts'
import { useHomePresenter } from './HomePresenter/UseHomePresenter'

//----------------------------------
// props
//----------------------------------
export interface HomeProps {
  firebaseUser: firebase.User | null
  className?: string
}

//----------------------------------
// component
//----------------------------------
export const HomeContainer = (props: HomeProps) => {
  //----------------------------------
  // hooks
  //----------------------------------
  const form = useForm(props.firebaseUser, 'posts')
  const fetchUsers = useFetchUsers('users', props.firebaseUser)
  const fetchPosts = useFetchPosts('posts', props.firebaseUser)
  const presenter = useHomePresenter(
    fetchUsers.fetchUserData(),
    fetchUsers.fetchUsersData(),
    fetchPosts.fetchPostDatas()
  )

  return (
    <BaseLayout
      className={props.className}
      firebaseUser={props.firebaseUser}
      user={presenter.viewDatas().user}
    >
      {!fetchUsers._isUserLoading && (
        <Box className={'l-wrapper'}>
          <SideBar className={'l-user'}>
            <User
              user={presenter.viewDatas().user}
              firebaseUser={props.firebaseUser}
            />
          </SideBar>

          <Main className={'l-timeline'}>
            <Box className={'l-timeline-inner'}>
              {presenter.viewDatas().posts?.map((post, index) => (
                <Box key={index} mb={Margin.m32}>
                  <Posts post={post} form={form} user={props.firebaseUser} className={'l-timeline-post'} />
                </Box>
              ))}
              <Box py={Padding.p16}>
                <PostsForm form={form} />
              </Box>
            </Box>
          </Main>
        </Box>
      )}
    </BaseLayout>
  )
}
