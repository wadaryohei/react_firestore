/**
 * Container層
 * - スタイルコンポーネントにデータを渡す
 * - ロジックが必要な場合は、ここに記述する
 */
import React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '../Typography'
import { CardMedia } from '../CardMedia'
import { useFetchUsers } from '../../../hooks/useFetchUsers'

//----------------------------------
// props
//----------------------------------
export interface HeaderProps {
  firebaseUser: firebase.User | null
  className?: string
}

//----------------------------------
// component
//----------------------------------
export const HeaderContainer = (props: HeaderProps) => {
  //----------------------------------
  //  hooks
  //----------------------------------
  const fetchProfile = useFetchUsers('users', props.firebaseUser)

  //----------------------------------
  // render
  //----------------------------------
  return (
    <header className={props.className}>
      <div>
        <Typography variant={'h1'} color={'white'}>
          React × Firebase
        </Typography>
        <Link to={`/user/${fetchProfile.fetchUserData()?.id}`}>
          <CardMedia
            imgSrc={fetchProfile.fetchUserData()?.photoURL}
            alt={fetchProfile.fetchUserData()?.photoURL}
          />
        </Link>
      </div>
    </header>
  )
}
