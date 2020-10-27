import Styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'
import { Dimensions } from 'react-native'

const { width } = Dimensions.get('screen')

export const Container = Styled.View`
  width:${width}px;
  flex-direction: row;
  margin-bottom: 30px;
`
export const HeaderTitle = Styled.View`
  width:${width / 2}px;  
`
export const DetailsContainer = Styled.View`
  width: 100%;
  justify-content: center;
  
`
export const HeaderCard = Styled.View`
  width: 100%;
  justify-content: center;
  margin-bottom: 25px;
`
export const BodyCard = Styled.View`
  width: 100%;
`
export const Column = Styled.View`
  flex: 1;
  justify-content: space-evenly;
`
export const Item = Styled.View`
  margin-bottom: 25px
`
export const FilterContainer = Styled.View`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  padding-horizontal: 15px;
  padding-vertical: 20px;
`
export const Button = Styled(RectButton)`
  border-radius: 4px;
  width: ${props => props.size ? props.size : '100%'};
  justify-content: center;
  align-items: center;
  background-color: ${props => props.background ? props.background : '#008b54'};
  padding: 15px;
  margin-top: 15px;
  flex-direction: row;
`
export const TextButton = Styled.Text`
  color: ${props => props.color ? props.color : '#333'};
`