import Styled from 'styled-components/native'
import Forgot from "./assets/forgot.png"

export const Container = Styled.View`
  width: 100%;
`
export const ImgForgot = Styled.Image.attrs({
  source: Forgot,
  resizeMode: "contain",
})`
  width: 200px;
  height: 156px;
  margin-bottom: 15px;
`