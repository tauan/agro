
import Styled from 'styled-components/native'
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
  margin-top: 0px;
  margin-Vertical: 25px;
  padding-horizontal: 15px;
`
export const BodyCard = Styled.View`
  width: 100%;
`
export const Section = Styled.View`
  justify-content: space-between;
  flex-direction: ${props => props.direction ? props.direction : 'row'};
  background-color: ${props => props.background ? props.background : 'transparent'};
`
export const Item = Styled.View`
  margin-bottom: 15px;
`
export const FilterContainer = Styled.View`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  align-items: flex-end;
`
export const Button = Styled.Pressable.attrs({
  android_ripple: { color: '#63636350' }
})
  `
  border-radius: 0px;
  width: ${props => props.size ? props.size : '50%'};
  justify-content: center;
  align-items: center;
  background-color: ${props => props.background ? props.background : '#008b54'};
  padding: 15px;
  flex-direction: row;
  z-index: 10000;
`
export const CloseButton = Styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding: 10px;
  right: 0px;
`
export const TextButton = Styled.Text`
  color: ${props => props.color ? props.color : '#333'};
`
