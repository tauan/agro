import Styled from 'styled-components/native'

export const Container = Styled.View`
    flex: 1;
    width: 100%;
    height: 100%;    
    justify-content: center;
    align-items: center;
`
export const ContainerIMG = Styled.View`
    width: 60px;
    height: 60px;
    overflow: hidden;
    border-radius: 30px;
`
export const Body = Styled.View`
    width: 100%;
    margin-top: 50px;
    border-radius: 20px;
    justify-content: center;  
    align-items: center;
    background-color: #ffffff; 
`
export const ContainerButtons = Styled.View`
    width: 100%;
    justify-content: space-between;
    flex-direction: ${props => props.direction ? props.direction : 'column'};
    `
export const Header = Styled.View`
    width: 100%;
    align-items: center; 
    
`
export const IMGUser = Styled.Image.attrs({
    resizeMode: "cover",
})`
    width: 100%;
    height: 100%;  
`
export const Logo = Styled.Image.attrs({
    resizeMode: "cover",
})`
    width: 133px;
    height: 37.82px;  
`
export const ContainerItem = Styled.TouchableOpacity.attrs({
    activityOpacity: 0.98,
})`
    width: 30%;
    height: 120px;
    padding-vertical: 15px;
    align-items: center;
    /* border-width: 0.5px; */
    border-color:#E5E7E9;
    background-color: ${props => props.background ? props.background : '#ffffff'};
    border-radius: 10px;
    justify-content: space-evenly;
    elevation: 1
`
export const CloseButton = Styled.TouchableOpacity.attrs({
    activityOpacity: 0.8,
})`
    /* width: ${props => props.width ? props.width : 30+'%'}; */
    background-color: ${props => props.background ? props.background : '#ffffff'};
    align-items: center;
    flex-direction: row
`