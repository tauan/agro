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
export const Title1 = Styled.Text`  
  font-size: 30px;
  color: ${props => props.color ? props.color : '#008b54'};
  font-weight: bold;
`
export const Title2 = Styled.Text`  
  font-size: 24px;
  color: ${props => props.color ? props.color : '#008b54'};
  text-align: center;
  font-weight: bold;
`
export const Title3 = Styled.Text`  
  font-size: 18px;
  color: ${props => props.color ? props.color : '#008b54'};
  font-weight: bold;
`
export const Title4 = Styled.Text`  
  font-size: 14px;
  color:${props => props.color ? props.color : '#008b54'};
  font-weight: bold;
`
export const Text1 = Styled.Text`  
  font-size: 14px;
  color: ${props => props.color ? props.color : '#333'};
`
export const Text2 = Styled.Text`  
  font-size: 18px;
  color: ${props => props.color ? props.color : '#333'};
`
export const Text3 = Styled.Text`  
  font-size: 24px;
  color: ${props => props.color ? props.color : '#333'};
`
export const Text4 = Styled.Text`  
  font-size: 30px;
  color: ${props => props.color ? props.color : '#333'};
`