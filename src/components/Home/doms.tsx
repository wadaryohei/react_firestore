/**
 * DOM層
 * - 宣言的UIを記述する
 * - データをPropsで受け取る
 * - 出し分け以外のロジックはContainer層で書く
 *   - props => ()とすることにより、余計なロジックが入らないようにする
 */
import React from 'react'
import { StyledCard } from '../_shared/Card/index'
import { StyledTypography } from '../_shared/Typography/index'
import { StyledPostsForm } from './User/PostsForm/index'
import { StyledOtherUsers } from './OtherUsers/index'
import { Grid, Divider } from '@material-ui/core'
import { Posts } from './User/Posts/doms'
import { Profile } from './User/Profile/doms'
import { HomeDomsProps } from './types'

//----------------------------------
// component
//----------------------------------
export const Home = (props: HomeDomsProps) => (
  //----------------------------------
  // render
  //----------------------------------
  <Grid container spacing={3} className={props.className}>
    {/** @Section Profile */}
    <Grid item xs={12} md={4}>
      <StyledCard>
        <Profile
          user={props.user}
          firebaseUser={props.firebaseUser}
          signOut={props.signOut}
        />
        <StyledPostsForm form={props.form} />
        {props.presenter.isPostsDividerShow() && <Divider />}
        {props.posts?.map((post, index) => (
          <Posts key={index} post={post} form={props.form} />
        ))}
      </StyledCard>
    </Grid>

    {/** @Section Users */}
    <Grid item xs={12} md={8}>
      <StyledCard>
        {!props.presenter.isEmptyUsers() && (
          <>
            <StyledTypography variant={'h1'}>Users</StyledTypography>

            {props.otherUsers?.map((otherUser, index) => {
              return (
                <div key={index}>
                  <StyledOtherUsers
                    otherUser={otherUser}
                    follow={props.follow}
                    firebaseUser={props.firebaseUser}
                    userLoading={props.userLoading}
                  />
                  {props.presenter.isUsersDividerShow(index) && <Divider />}
                </div>
              )
            })}
          </>
        )}

        {props.presenter.isEmptyUsers() && (
          <StyledTypography variant={'h2'}>
            {props.presenter.emptyUsersMessage()}
          </StyledTypography>
        )}
      </StyledCard>
    </Grid>
  </Grid>
)
