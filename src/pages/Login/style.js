import Styled from 'styled-components/native'
import { Dimensions } from 'react-native'
import LogoImage from "./assets/logo.png"
import Contag from "./assets/contag_logo.png"

export const Container = Styled.View`
  width: 100%;
  position: absolute;
  bottom: 15px;
  height: 12%; 
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
flex: 1;
  height: 80px;  
  position: absolute;
  bottom: 0px;
`