/**
 * Style層
 * - CSSを記述する
 * - styledの引数でコンポーネントを受け取る
 * - CSSのネストが深くなったらコンポーネント分割を検討する
 */
import { createGlobalStyle } from 'styled-components'
import { Colors } from '../../../const/Colors'

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Roboto, 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif;
    color: ${Colors.black};
  }

  li {
    list-style: none;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
`
