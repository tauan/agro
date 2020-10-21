import Styled from 'styled-components/native'
import RegisterPhone from "./assets/register_phone.png"

export const Container = Styled.View`
  width: 100%;
`
export const ImgRegister = Styled.Image.attrs({
  source: RegisterPhone,
  resizeMode: "contain",
})`
  width: 200px;
  height: 156px;
  margin-bottom: 15px;
`