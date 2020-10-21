import Styled from 'styled-components/native'
import Forgot from "./assets/forgot.png"

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
export const ImgForgot = Styled.Image.attrs({
  source: Forgot,
  resizeMode: "contain",
})`
  width: 200px;
  height: 156px;
  margin-bottom: 15px;
`