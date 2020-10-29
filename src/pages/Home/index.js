import React, { useContext } from 'react'
import { ImageBackground } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Primary from '../../components/Buttons/Primary'
import Link from '../../components/Buttons/Link'
import UserIMG from './assets/user.jpg'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import UserContext from '../../contexs/User'
import AuthContext from '../../contexs/Auth'
import BKG from './assets/background.jpg'
import LogoContag from './assets/logo.png'

import {
    TitleStyle,
    TextStyle
} from '../style'

import {
    IMGUser,
    ContainerIMG,
    Body,
    Container,
    ContainerButtons,
    ContainerItem,
    Header,
    Logo
} from './style'

export default ({ navigation }) => {
    const { user } = useContext(UserContext)
    const { logout } = useContext(AuthContext)
    const { navigate } = navigation
    return (
        <ImageBackground source={BKG} style={{ flex: 1 }}>
            {/* <LinearGradient colors={['#3ae25480', '#00261080']} start={{ x: 0.30, y: 0.25 }} end={{ x: 0.0, y: 1.2 }} style={{ flex: 1 }}> */}
                <Container>
                    {/* <TextStyle style={{ marginBottom: 25 }} color="#fff" fontsize={18}>Seja bem vindo</TextStyle> */}
                    <Body >
                        <Header>
                        <Logo source={LogoContag} />
                            <ContainerIMG >
                                <IMGUser source={UserIMG} />
                            </ContainerIMG>
                            <TitleStyle style={{marginTop: 15}} fontsize={28} align="center">{user[0].nome}</TitleStyle>
                            <TextStyle>STR de Vitória da Conquista - BA</TextStyle>
                            <Primary width="100%" title='Editar perfil' fontsize={18} />
                        </Header>
                        <ContainerButtons direction="row">
                            <ContainerItem background="#008b54" onPress={() => navigate('PropertyScreen')}>
                                <MaterialIcons name="location-pin" size={60} color="#fff" />
                                <TextStyle align="center" color="#fff">Local de produção</TextStyle>
                            </ContainerItem>
                            <ContainerItem background="#008b54" onPress={() => navigate('ProductScreen')} >
                                <MaterialCommunityIcons name="food-apple" size={60} color="#fff" />
                                <TextStyle align="center" color="#fff">Produtos</TextStyle>
                            </ContainerItem>
                            <ContainerItem background="#008b54" onPress={() => navigate('TagsScreen')}>
                                <MaterialIcons name="qr-code-2" size={60} color="#fff" />
                                <TextStyle align="center" color="#fff">Etiquetas</TextStyle>
                            </ContainerItem>
                        </ContainerButtons>
                    </Body>
                    <Link title='Desconectar' color="#fff" onPress={() => logout()} width={110} />
                </Container >
            {/* </LinearGradient> */}
        </ImageBackground>
    )
}