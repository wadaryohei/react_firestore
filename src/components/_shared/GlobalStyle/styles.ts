import { createGlobalStyle } from 'styled-components'
import { Colors } from '../../../const/Colors'

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
    color: ${Colors.gray};
    margin: 0;
    padding: 0;
  }
`
