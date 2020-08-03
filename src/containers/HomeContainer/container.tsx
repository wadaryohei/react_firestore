import React from 'react'
import { Box } from '@material-ui/core'
import { BaseLayout } from '../../components/_shared/BaseLayout'
import { Post } from '../../components/_shared/Post'
import { PostForm } from '../../components/_shared/PostForm'
import { User } from '../../components/_shared/User/doms'
import { Typography } from '../../components/_shared/Typography'
import { SideBar } from '../../components/_shared/SideBar'
import { Main } from '../../components/_shared/Main'
import { Margin } from '../../const/Margin'
import { Padding } from '../../const/Padding'
import { useForm } from '../../hooks/useForm'
import { useFetchUsers } from '../../hooks/useFetchUsers'
import { useFetchPosts } from '../../hooks/useFetchPosts'
import { useHomePresenter } from './HomePresenter/UseHomePresenter'
import { PostType } from '../../model/Post/type'

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
    fetchPosts.fetchPostDatas()
  )

  return (
    <BaseLayout
      className={props.className}
      firebaseUser={props.firebaseUser}
      user={presenter.viewDatas().user}
    >
      <Box className={'l-wrapper'}>
        <SideBar className={'l-user'}>
          <User
            user={presenter.viewDatas().user}
            firebaseUser={props.firebaseUser}
          />
        </SideBar>

        <Main className={'l-timeline'}>
          <Box className={'l-timeline-inner'}>
          { !presenter.isExsistsPosts() && <Typography component={'p'}>投稿がまだありません</Typography> }
          {
            presenter.isExsistsPosts() &&
            presenter.viewDatas().posts?.map((post: PostType, index: number) => (
              <Box key={index} mb={Margin.m32}>
                <Post post={post} form={form} user={props.firebaseUser} className={'l-timeline-post'} />
              </Box>
            ))
          }
            <Box py={Padding.p16}>
              <PostForm form={form} />
            </Box>
          </Box>
        </Main>
      </Box>
    </BaseLayout>
  )
}
