/**
 * Container層
 * - スタイルコンポーネントにデータを渡す
 * - ロジックが必要な場合は、ここに記述する
 */
import React from 'react'
import { useForm } from '../../hooks/useForm'
import { useFollow } from '../../hooks/useFollow'
import { useHomePresenter } from './Presenter/UseHomePresenter'
import { useFetchUsers } from '../../hooks/useFetchUsers'
import { useFetchPosts } from '../../hooks/useFetchPosts'
import { HomeContainerProps } from './types'
import { Grid, Divider, Box } from '@material-ui/core'
import { Profile } from './User/Profile'
import { Layout } from '../_shared/Layout'
import { Card } from '../_shared/Card'
import { Typography } from '../_shared/Typography'
import { StyledPosts } from './User/Posts'
import { StyledPostsForm } from './User/PostsForm'
import { StyledOtherUsers } from './OtherUsers'
import { Margin } from '../../const/Margin'

//----------------------------------
// component
//----------------------------------
export const Home = (props: HomeContainerProps) => {
  //----------------------------------
  // hooks
  //----------------------------------
  const follow = useFollow()
  const form = useForm(props.firebaseUser, 'posts')
  const fetchProfile = useFetchUsers('users', props.firebaseUser)
  const fetchPosts = useFetchPosts('posts', props.firebaseUser)
  const presenter = useHomePresenter(
    fetchProfile.fetchUserData(),
    fetchPosts.fetchUserPostData(),
    fetchProfile.fetchOtherUsersData()
  )

  //----------------------------------
  // render
  //----------------------------------
  return (
    <Layout firebaseUser={props.firebaseUser}>
      {!fetchProfile._isUserLoading && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              {/**
               * ==========================================
               * @Section Profile
               * ==========================================
               */}
              <Profile
                user={presenter.viewDatas().user}
                firebaseUser={props.firebaseUser}
              />
              <Box mt={Margin.m8}>
                <StyledPostsForm form={form} />
                {presenter.isPostsDividerShow() && (
                  <Box my={Margin.m24}>
                    <Divider />
                  </Box>
                )}
              </Box>

              {/**
               * ==========================================
               * @Section 自分の投稿情報一覧
               * ==========================================
               */}
              <Box mt={Margin.m8}>
                {presenter.viewDatas().posts?.map((post, index) => (
                  <StyledPosts key={index} post={post} form={form} />
                ))}
              </Box>
            </Card>
          </Grid>

          {/**
           * ==========================================
           * @Section Users
           * ==========================================
           */}
          <Grid item xs={12} md={8}>
            <Card>
              {!presenter.isEmptyUsers() && (
                <>
                  <Typography variant={'h1'}>Users</Typography>

                  {/**
                   * ==========================================
                   * @Section Users情報一覧
                   * ==========================================
                   */}
                  {presenter.viewDatas().otherUsers?.map((otherUser, index) => {
                    return (
                      <div key={index}>
                        <StyledOtherUsers
                          otherUser={otherUser}
                          follow={follow}
                          firebaseUser={props.firebaseUser}
                          userLoading={fetchProfile._isUserLoading}
                        />
                        {presenter.isUsersDividerShow(index) && (
                          <Box my={Margin.m24}>
                            <Divider />
                          </Box>
                        )}
                      </div>
                    )
                  })}
                </>
              )}

              {/**
               * ==========================================
               * @Section Users情報が存在しない場合のメッセージ
               * ==========================================
               */}
              {presenter.isEmptyUsers() && (
                <Typography variant={'h2'}>
                  {presenter.emptyUsersMessage()}
                </Typography>
              )}
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  )
}
