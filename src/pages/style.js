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
export const Form = Styled.View`
  width: 100%;
`
export const TitleStyle = Styled.Text`  
  font-size: ${props => props.fontsize ? props.fontsize : 32}px;
  color: ${props => props.color ? props.color : '#008b54'};
  font-weight: bold;
`
export const TextStyle = Styled.Text`  
  font-size: ${props => props.fontsize ? props.fontsize : 14}px;
  color: ${props => props.color ? props.color : '#333'};
`