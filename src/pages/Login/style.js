import Styled from 'styled-components/native'
import { Dimensions } from 'react-native'
import LogoImage from "./assets/logo.png"

const width = Dimensions.get("screen").width 
const grid = width - 40

export const App = Styled.View`
  flex: 1;
  width: 100%;
  padding-horizontal: 20px;
  background: #fff;
  justify-content: center
`;
export const Form = Styled.View`
  width: 100%;
`
export const Logo = Styled.Image.attrs({
  source: LogoImage,
  resizeMode: "contain",
})`
  width: 100%;
  margin-bottom: 54px
`