import Styled from 'styled-components/native'
import { Dimensions } from 'react-native'
import RegisterPhone from "./assets/register_phone.png"
// import Contag from "./assets/contag_logo.png"

const { width } = Dimensions.get("screen")
const grid = width - 40

export const App = Styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  padding-horizontal: 20px;
  background: #fff;
  justify-content: center;  
  align-items: center;
  overflow: hidden
`;
export const Form = Styled.View`
  width: 100%;
`
export const Container = Styled.View`
  width: 100%;
`
export const Title = Styled.Text`  
  fontSize: 24px;
  textAlign: center;
  color: #07AC82;
`
export const ImgRegister = Styled.Image.attrs({
  source: RegisterPhone,
  resizeMode: "contain",
})`
  width: 200px;
  height: 156px;
  margin: auto;
  margin-bottom: 15px;
`