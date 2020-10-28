import Styled from 'styled-components/native'
import Logo from '../../assets/contag_logo.png'

export const Container = Styled.View`
  flex: 1;
  background: #fff;
  align-items: center;
  justify-content: center;
`
export const LogoContainer = Styled.View`
  width: 200px;
  height: 300px;
`
export const LogoImage = Styled.Image.attrs({
  source: Logo
})`
  height: 100%;
  width: 200px
`
export const StatusContainer = Styled.View`
  margin-top: 30px;
  flex-direction: row
`