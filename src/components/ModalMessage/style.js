import Styled from 'styled-components/native'

export const Modal = Styled.Modal.attrs({
  animationType: "fade",
  transparent: true,
})`
`
export const Container = Styled.View`
flex: 1;
width: 100%;
justify-content: center;
align-items: center;
background-color: rgba(255 ,255, 255, 0.9);
`
export const BoxMessage = Styled.View`
width: 90%;
border-radius: 10px;
overflow: hidden;
justify-content: center;
align-items: center;
background-color: #ffffff;
padding: ${props => props.padding ? props.padding : 0}px;
elevation: 10
`
export const DialogBox = Styled.View`
width: 100%;
justify-content: center;
align-items: center;
padding: 25px;
`
export const Button = Styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`  
  font-size: 16px;
  font-weight: bold;
  margin-top: 15px;
  padding:15px;
  `
export const TextButton = Styled.Text`  
  font-size: 16px;
  text-align: center;
  color: #333;
`