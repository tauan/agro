import Styled from 'styled-components/native'

export const Container = Styled.View`
  flex: 1;
  width: 100%;
  height: 100%;  
  
  justify-content: center;  
  align-items: flex-end;
`;
export const ContainerIMG = Styled.View`
    width: 70px;
    height: 70px;
    overflow: hidden;
    border-radius: 4px;
    border-radius: 100px;
    border-width: 2px;
    border-color: #ffffff;
`
export const Body = Styled.View`
    flex: 1;
    width: 100%;
    justify-content: flex-end;
    padding-horizontal: 20px;
`
export const Footer = Styled.View`
    width: 100%; 
    height: 200px; 
    border-top-left-radius: 20px; 
    border-top-right-radius: 20px; 
    margin-top: 34px;
    padding-horizontal: 20px;
    background: #FFFFFF;
`
export const Scroll = Styled.ScrollView.attrs({
    horizontal: true,
    contentContainerStyle: {
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})`
width: 100%    
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
width: 30%;
height: 80%;
align-items: center;
background-color: #EDEDED;
border-radius: 10px;
justify-content: center;
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