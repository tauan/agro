import Styled from 'styled-components/native'
import { Dimensions } from 'react-native'
import IMG from "./images.jpg"

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
border-radius: 4px;
border-top-left-radius: 30px;
border-bottom-right-radius: 30px;
background-color: blue;
overflow: hidden;
justify-content: center;
align-items: center;
`
export const IMGItem = Styled.Image.attrs({
    source: IMG,
    resizeMode: "cover",

})`
    width: 120%;
    height: 120%;
  `
export const Title = Styled.Text`  
  padding-left: 10px;
  font-size: 16px;
  text-align: center;
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
  color: #F43D3D;
`