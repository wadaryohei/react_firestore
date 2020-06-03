/**
 * Container層
 * - スタイルコンポーネントにデータを渡す
 * - ロジックが必要な場合は、ここに記述する
 */
import React from 'react'
import { useForm } from '../../hooks/useForm'
import { useFollow } from '../../hooks/useFollow'
import { useFetchUsers } from '../../hooks/useFetchUsers'
import { useFetchPosts } from '../../hooks/useFetchPosts'
import { Grid, Divider, Box } from '@material-ui/core'
import { useHomePresenter } from './HomePresenter/UseHomePresenter'
import { Profile } from '../../components/_shared/User/Profile'
import { BaseLayout } from '../../components/_shared/BaseLayout'
import { Card } from '../../components/_shared/Card'
import { Typography } from '../../components/_shared/Typography'
import { Posts } from '../../components/_shared/User/Posts'
import { PostsForm } from '../../components/_shared/User/PostsForm'
import { OtherUsers } from '../../components/_shared/User/Users'
import { Margin } from '../../const/Margin'

//----------------------------------
// props
//----------------------------------
export interface HomeProps {
  firebaseUser: firebase.User | null
}

//----------------------------------
// component
//----------------------------------
export const Home = (props: HomeProps) => {
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
    <BaseLayout
      firebaseUser={props.firebaseUser}
      user={presenter.viewDatas().user}
    >
      {!fetchProfile._isUserLoading && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              {/**
               * ==========================================
               * @Section 自分のユーザー情報
               * ==========================================
               */}
              <Profile
                user={presenter.viewDatas().user}
                firebaseUser={props.firebaseUser}
              />
              <Box mt={Margin.m8}>
                <PostsForm form={form} />
                {presenter.isPostsDividerShow() && (
                  <Box my={Margin.m24}>
                    <Divider />
                  </Box>
                )}
              </Box>

              {/**
               * ==========================================
               * @Section 自分の投稿情報
               * ==========================================
               */}
              <Box mt={Margin.m8}>
                {presenter.viewDatas().posts?.map((post, index) => (
                  <Posts key={index} post={post} form={form} />
                ))}
              </Box>
            </Card>
          </Grid>

          {/**
           * ==========================================
           * @Section 自分以外のユーザーの情報
           * ==========================================
           */}
          <Grid item xs={12} md={8}>
            <Card>
              {!presenter.isEmptyUsers() && (
                <>
                  <Typography variant={'h1'}>Users</Typography>

                  {presenter.viewDatas().otherUsers?.map((otherUser, index) => {
                    return (
                      <div key={index}>
                        <OtherUsers
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
    </BaseLayout>
  )
}
