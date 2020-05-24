/**
 * DOM層
 * - 宣言的UIを記述する
 * - データをPropsで受け取る
 * - 出し分け以外のロジックはContainer層で書く
 *   - props => ()とすることにより、余計なロジックが入らないようにする
 */
import React from 'react'
import { StyledTypography } from '../Typography/index'
import { HeaderDomsProps } from './types'
import { StyledCardMedia } from '../CardMedia'
import { Link } from 'react-router-dom'

//----------------------------------
// component
//----------------------------------
export const Header = (props: HeaderDomsProps) => (
  //----------------------------------
  // render
  //----------------------------------
  <div className={props.className}>
    <div>
      <StyledTypography variant={'h1'} color={'white'}>
        React × Firebase
      </StyledTypography>
      <Link to={`/user/${props.user?.id}`}>
        <StyledCardMedia
          imgSrc={props.user?.photoURL}
          alt={props.user?.photoURL}
        />
      </Link>
    </div>
  </div>
)
