/**
 * Container層
 * - スタイルコンポーネントにデータを渡す
 * - ロジックが必要な場合は、ここに記述する
 */
import React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '../Typography'
import { CardMedia } from '../CardMedia'
import { UserData } from '../../../model/Datas/User/types'

//----------------------------------
// props
//----------------------------------
export interface HeaderProps {
  user: UserData | undefined
  className?: string
}

//----------------------------------
// component
//----------------------------------
export const HeaderDoms = (props: HeaderProps) => {
  //----------------------------------
  // render
  //----------------------------------
  return (
    <header className={props.className}>
      <div>
        <Typography component={'h1'} color={'white'}>
          React × Firebase
        </Typography>
        <Link to={`/user/${props.user?.id}`}>
          <CardMedia imgSrc={props.user?.photoURL} alt={props.user?.photoURL} />
        </Link>
      </div>
    </header>
  )
}
