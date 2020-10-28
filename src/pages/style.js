import Styled from 'styled-components/native'

export const App = Styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  padding-horizontal: 20px;
  background: #fff;
  justify-content: center;  
  align-items: center
`;
export const Grid = Styled.View`
  padding-horizontal: 20px;
`
export const Form = Styled.View`
  width: 100%;
`
export const TitleStyle = Styled.Text`  
  font-size: ${props => props.fontsize ? props.fontsize : 32}px;
  color: ${props => props.color ? props.color : '#008b54'};
  font-weight: bold;
`
export const Title2 = Styled.Text`  
  font-size: 24px;
  color: #008b54;
  text-align: center;
  font-weight: bold;
`
export const Title3 = Styled.Text`  
  font-size: 18px;
  color: #008b54;
  font-weight: bold;
`
export const Title3Regular = Styled.Text`  
  font-size: 18px;
  color: #008b54;
  font-weight: normal;
`
export const Title4 = Styled.Text`  
  font-size: 14px;
  color: #008b54;
  font-weight: bold;
`
export const Text1 = Styled.Text`  
  font-size: 14px;
  color: #333;
`
export const Text2 = Styled.Text`  
  font-size: 18px;
  color: #333;
`
export const Text3 = Styled.Text`  
  font-size: 24px;
  color: #333;
`
export const Text4 = Styled.Text`  
  font-size: 30px;
  color: #333;
`
export const TextStyle = Styled.Text`  
  font-size: ${props => props.fontsize ? props.fontsize : 14}px;
  color: ${props => props.color ? props.color : '#333'};
  text-align: ${props => props.align ? props.align : 'left'};
`