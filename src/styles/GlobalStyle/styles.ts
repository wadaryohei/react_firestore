import { createGlobalStyle } from 'styled-components'
import { Colors } from '../../const/Colors'

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Roboto, 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif;
    color: ${Colors.black};
    background-color: ${Colors.gray};
  }

  li {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`
