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
  height: 200px;
  align-items: center
`
export const LogoImage = Styled.Image.attrs({
  source: Logo
})`
  height: 190px;
  width: 128.3px
`
export const StatusContainer = Styled.View`
  margin-top: 30px;
  flex-direction: row
`