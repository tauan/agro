import Styled from 'styled-components/native'
import { Dimensions } from 'react-native'
import LogoImage from "./assets/logo.png"
import Contag from "./assets/contag_logo.png"

const { width } = Dimensions.get("screen")
const grid = width - 40

export const App = Styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  padding-horizontal: 20px;
  background: #fff;
  justify-content: center;  
  align-items: center
`;
export const Form = Styled.View`
  width: 100%;
`
export const Container = Styled.View`
  width: 100%;
`
export const Logo = Styled.Image.attrs({
  source: LogoImage,
  resizeMode: "contain",
})`
  width: 65%;
`

export const LogoContag = Styled.Image.attrs({
  source: Contag,
  resizeMode: "contain",
})`  
  height: 12%;
  position: absolute;
  bottom: 0;
`