import Styled from 'styled-components/native'
import { Dimensions } from 'react-native'

const { width } = Dimensions.get('screen')

export const Container = Styled.View`
width: ${(width / 2.4)}px;
align-items: flex-start;
margin-bottom: 15px;
`
export const ContainerIMG = Styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
width: ${width / 2.4}px;
height: ${width / 2.4}px;
border-radius: 10px;
overflow: hidden;
justify-content: center;
align-items: center;
border-color: rgba(220,220,220,0.5);
border-width: 1px;
`
export const IMGItem = Styled.Image.attrs({
  resizeMode: "cover",
})`
    width: 85%;
    height: 85%;
    border-radius: 5px;
  `
export const Title = Styled.Text`  
  padding-left: 10px;
  font-size: 16px;
  text-align: left;
  color: #333;
  font-weight: bold;
`
export const Button = Styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`  
  padding-left: 10px;
  font-size: 16px;
  color: #333;
  font-weight: bold;
  `
export const TextButton = Styled.Text`  
  font-size: 16px;
  text-align: center;
  color: #919191;
`