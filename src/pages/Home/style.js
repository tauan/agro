import Styled from 'styled-components/native'

export const Container = Styled.View`
  flex: 1;
  width: 100%;
  height: 100%;  
  background: #fff;
  justify-content: center;  
  align-items: flex-end;
`;
export const ContainerIMG = Styled.View`
    width: 70px;
    height: 70px;
`
export const Body = Styled.View`
    flex: 1;
    width: 100%;
    justify-content: flex-end;
    padding-horizontal: 20px;
`
export const Footer = Styled.View`
    width: 100%; 
    height: 145px; 
    border-top-left-radius: 20px; 
    border-top-right-radius: 20px; 
    margin-top: 34px;
    padding-horizontal: 20px;
`
export const Scroll = Styled.ScrollView.attrs({
    horizontal: true,
})`
    
`
export const IMGUser = Styled.Image.attrs({
    resizeMode: "contain",
})`
  width: 100%;
  height: 100%;  
`
export const ContainerItem = Styled.TouchableOpacity.attrs({
    activityOpacity: 0.8,
})`
width: 85px;
height: 100px;
align-items: center;
`
export const ContainerItemIcon = Styled.View`
width: 65px;
height: 65px;
justify-content: center;
align-items: center;
border-radius: 4px;
background-color: #EDF1F6;
margin-bottom: 10px;
`