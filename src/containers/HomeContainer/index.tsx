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
import { BaseLayout } from '../../components/_shared/BaseLayout'
import { Card } from '../../components/_shared/Card'
import { Typography } from '../../components/_shared/Typography'
import { Posts } from '../../components/_shared/Posts'
import { PostsForm } from '../../components/_shared/PostsForm'
import { Users } from '../../components/_shared/Users'
import { Margin } from '../../const/Margin'
import { User } from '../../components/_shared/User/doms'

//----------------------------------
// props
//----------------------------------
export interface HomeProps {
  firebaseUser: firebase.User | null
}

//----------------------------------
// component
//----------------------------------
export const HomeContainer = (props: HomeProps) => {
  //----------------------------------
  // hooks
  //----------------------------------
  const follow = useFollow()
  const form = useForm(props.firebaseUser, 'posts')
  const fetchProfile = useFetchUsers('users', props.firebaseUser)
  const fetchPosts = useFetchPosts('posts', props.firebaseUser)
  const presenter = useHomePresenter(
    fetchProfile.fetchUserData(),
    fetchProfile.fetchUsersData(),
    fetchPosts.fetchUserPostData()
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
              <User
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

                  {presenter.viewDatas().users?.map((user, index) => {
                    return (
                      <div key={index}>
                        <Users
                          user={user}
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