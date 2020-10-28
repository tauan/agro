import React, { useContext } from 'react'
import { ImageBackground } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Primary from '../../components/Buttons/Primary'
import UserIMG from './assets/user.jpg'
import BKG from './assets/background.jpg'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import UserContext from '../../contexs/User'
import AuthContext from '../../contexs/Auth'

import {
    TitleStyle,
    TextStyle,
    Text3,
    Title1,
    Text1
} from '../style'

import {
    IMGUser,
    ContainerIMG,
    Body,
    Footer,
    Container,
    Scroll,
    ContainerItem,
    ContainerItemIcon
} from './style'

export default ({ navigation }) => {
    const { user } = useContext(UserContext)
    const { logout } = useContext(AuthContext)
    const { navigate } = navigation
    return (
        <ImageBackground source={BKG} style={{ flex: 1 }}>
            <LinearGradient colors={['transparent', '#002610', '#002610']} start={{ x: 0.30, y: 0.25 }} end={{ x: 0.0, y: 1.2 }} style={{ flex: 1 }}>
                <Container>
                    <Primary title='Desconectar' marginRight={20} backgroundColor="#F43D3D" onPress={() => logout()} width={150} shadow={2} />
                    <Body>
                        <ContainerIMG >
                            <IMGUser source={UserIMG} />
                        </ContainerIMG>
                        <Text3 style={{ color: '#FFFFFF' }}>Seja bem vindo,</Text3>
                        <Title1 style={{color: '#FFF'}}>{user.nome}</Title1>
                        <Text1 style={{ color: '#FFFFFF' }}><MaterialIcons name="location-pin" size={13} color="#fff" /> STR de Vitória da Conquista - BA</Text1>
                        <Primary title='Editar perfil' shadow={2} />
                    </Body>
                    <Footer>
                        <Scroll>
                            <ContainerItem style={{ backgroundColor: '#EDF1F6' }} onPress={() => navigate('PropertyScreen')}>
                                <ContainerItemIcon>
                                    <MaterialIcons name="location-pin" size={60} color="#666666" />
                                </ContainerItemIcon>
                                <TextStyle align="center" color="#333">Local de produção</TextStyle>
                            </ContainerItem>
                            <ContainerItem style={{ backgroundColor: '#EDF1F6' }} onPress={() => navigate('ProductScreen')} >
                                <ContainerItemIcon>
                                    <MaterialCommunityIcons name="food-apple" size={60} color="#666666" />
                                </ContainerItemIcon>
                                <TextStyle align="center" color="#333">Produtos</TextStyle>
                            </ContainerItem>
                            <ContainerItem style={{ backgroundColor: '#EDF1F6' }} onPress={() => navigate('TagsScreen')}>
                                <ContainerItemIcon>
                                    <MaterialIcons name="qr-code-2" size={60} color="#666666" />
                                </ContainerItemIcon>
                                <TextStyle align="center" color="#333">Etiquetas</TextStyle>
                            </ContainerItem>
                        </Scroll>
                    </Footer>
                </Container>
            </LinearGradient>
        </ImageBackground>
    )
}