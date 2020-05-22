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
import { useAuth } from '../../hooks/useAuth'
import { StyledHome } from './styles'
import { HomeContainerProps } from './types'

//----------------------------------
// component
//----------------------------------
export const Home = (props: HomeContainerProps) => {
  //----------------------------------
  // hooks
  //----------------------------------
  const { signOut } = useAuth()
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
    <>
      {!fetchProfile._isUserLoading && (
        <StyledHome
          user={presenter.viewDatas().user}
          otherUsers={presenter.viewDatas().otherUsers}
          posts={presenter.viewDatas().posts}
          firebaseUser={props.firebaseUser}
          userLoading={fetchProfile._isUserLoading}
          signOut={signOut}
          follow={follow}
          form={form}
          presenter={presenter}
        />
      )}
    </>
  )
}
