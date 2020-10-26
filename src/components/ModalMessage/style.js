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
box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.5);
elevation: 15;
`

export const Button = Styled.TouchableOpacity.attrs({
    activeOpacity: 0.5,
})`  
  font-size: 16px;
  font-weight: bold;
  padding-Top: 20px;
  `
export const TextButton = Styled.Text`  
  font-size: 16px;
  text-align: center;
  color: #333;
`