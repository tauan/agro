import React, { useContext } from 'react'
import { ImageBackground } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Primary from '../../components/Buttons/Primary'
import Header from '../../components/Header'
import UserIMG from './assets/user.jpg'
import BKG from './assets/background.jpg'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import UserContext from '../../contexs/User'

import { Title1, Paragraph1, Paragraph3 } from '../style'
import { IMGUser, ContainerIMG, Body, Footer, Container, Scroll, ContainerItem, ContainerItemIcon } from './style'

export default ({ navigation }) => {
    const { user } = useContext(UserContext)
    const { navigate } = navigation
    console.log(user)
    return (
        <ImageBackground source={BKG} style={{ flex: 1 }}>
            <LinearGradient colors={['transparent', '#002610', '#002610']} start={{ x: 0.30, y: 0.25 }} end={{ x: 0.0, y: 1.2 }} style={{ flex: 1 }}>
                {/* <Header backgroundColor="transparent" color="#ffffff" title="Início" navigation={navigation} /> */}
                <Container>
                    <Primary title='Desconectar' marginRight={20} backgroundColor="#F43D3D" width={150} shadow={2} />
                    <Body>
                        <ContainerIMG >
                            <IMGUser source={UserIMG} />
                        </ContainerIMG>
                        <Paragraph3 style={{ color: '#FFFFFF' }}>Seja bem vindo,</Paragraph3>
                        <Title1>{user[0].nome}</Title1>
                        <Paragraph1 style={{ color: '#FFFFFF' }}>STR de Vitória da Conquista - BA</Paragraph1>
                        <Primary width='100%' title='Editar perfil' shadow={2} />
                    </Body>
                    <Footer>
                        <Scroll>
                            <ContainerItem onPress={() => { }}>
                                <ContainerItemIcon>
                                    <MaterialIcons name="location-pin" size={40} color="#666666" />
                                </ContainerItemIcon>
                                <Paragraph1 style={{ textAlign: 'center', fontWeight: '700' }}>Loal de produção</Paragraph1>
                            </ContainerItem>
                            <ContainerItem onPress={() => navigate('ProductScreen')} >
                                <ContainerItemIcon>
                                    <MaterialCommunityIcons name="food-apple" size={40} color="#666666" />
                                </ContainerItemIcon>
                                <Paragraph1 style={{ textAlign: 'center', fontWeight: '700' }}>Produtos</Paragraph1>
                            </ContainerItem>
                            <ContainerItem onPress={() => { }}>
                                <ContainerItemIcon>
                                    <MaterialIcons name="qr-code-2" size={40} color="#666666" />
                                </ContainerItemIcon>
                                <Paragraph1 style={{ textAlign: 'center', fontWeight: '700' }}>Etiquetas</Paragraph1>
                            </ContainerItem>
                        </Scroll>
                    </Footer>
                </Container>
            </LinearGradient>
        </ImageBackground>
    )
}