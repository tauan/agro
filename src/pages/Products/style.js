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
  background-color: #ff0;
`