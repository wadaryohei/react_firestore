import React, { useContext } from 'react'
import { Box } from '@material-ui/core'
import { BaseLayout } from '../../components/_shared/BaseLayout'
import { Post } from '../../components/_shared/Post'
import { PostForm } from '../../components/_shared/PostForm'
import { User } from '../../components/_shared/User'
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
import { useLocation } from 'react-router-dom'
import { FirebaseAuthContext } from '../../context/authContext'

//----------------------------------
// props
//----------------------------------
export interface HomeProps {
  className?: string
}

//----------------------------------
// component
//----------------------------------
export const HomeContainer = (props: HomeProps) => {
  //----------------------------------
  // hooks
  //----------------------------------
  const auth = useContext(FirebaseAuthContext)
  const location = useLocation()
  const form = useForm('posts', auth)
  const fetchUsers = useFetchUsers('users', auth?.uid)
  const fetchPosts = useFetchPosts('posts', auth)
  const presenter = useHomePresenter(
    fetchUsers.fetchUserData(),
    fetchPosts.fetchPostDatas()
  )

  return (
    <BaseLayout className={props.className} user={presenter.viewDatas().user}>
      <Box className={'l-wrapper'}>
        <SideBar className={'l-user'}>
          <User
            pathClassName={location.pathname}
            user={presenter.viewDatas().user}
            firebaseUser={auth}
          />
        </SideBar>

        <Main className={'l-timeline'}>
          <Box className={'l-timeline-inner'}>
            {!presenter.isExsistsPosts() && (
              <Typography component={'p'}>投稿がまだありません</Typography>
            )}
            {presenter.isExsistsPosts() &&
              presenter
                .viewDatas()
                .posts?.map((post: PostType, index: number) => (
                  <Box key={index} mb={Margin.m32}>
                    <Post
                      post={post}
                      form={form}
                      user={auth}
                      className={'l-timeline-post'}
                    />
                  </Box>
                ))}
            <Box py={Padding.p16}>
              <PostForm form={form} />
            </Box>
          </Box>
        </Main>
      </Box>
    </BaseLayout>
  )
}
