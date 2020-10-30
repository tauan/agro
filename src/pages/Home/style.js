import Styled from 'styled-components/native'

export const Container = Styled.View`
    flex: 1;
    width: 100%;
    height: 100%; 
    background-color: #ffd000;   
    justify-content: center;
    align-items: center;
`
export const ContainerIMG = Styled.View`
    width: 120px;
    height: 120px;
    overflow: hidden;
    border-radius: 20px;
    margin-top: 30px;
`
export const Body = Styled.View`
    width: 90%;
    padding-horizontal: 30px;
    padding-vertical: 30px;
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
    margin-bottom: 25px;   
    border-bottom-width: 0.5px;
    border-color: #d5d5d5;
    padding-bottom: 25px;
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
    width: 150px;
    height: 42.8px;  
    margin-top: 30px;
`
export const ContainerItem = Styled.TouchableOpacity.attrs({
    activityOpacity: 0.98,
})`
    width: 30%;
    height: 120px;
    padding-vertical: 15px;
    align-items: center;
    background-color: ${props => props.background ? props.background : '#ffffff'};
    border-radius: 10px;
    justify-content: space-evenly;
    elevation: 10
`