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

import {
    Title1,
    Paragraph1,
    Paragraph3
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
    const { navigate } = navigation
    console.log(user)
    return (
        <ImageBackground blurRadius={0} source={BKG} style={{ flex: 1 }}>
            {/* <LinearGradient colors={['transparent', 'rgba(0, 38, 16, 0.4)', 'rgba(0, 38, 16, 0.6)']} start={{ x: 0.30, y: 0.3 }} end={{ x: 0.0, y: 0.8 }} style={{ flex: 1 }}> */}
                {/* <Header backgroundColor="transparent" color="#ffffff" title="Início" navigation={navigation} /> */}
                <Container>
                    {/* <Primary title='Desconectar' marginRight={20} backgroundColor="#F43D3D" width={150} shadow={2} /> */}
                    <Body>
                        <ContainerIMG >
                            <IMGUser source={UserIMG} />
                        </ContainerIMG>
                        <Paragraph3 style={{ color: '#FFFFFF' }}>Seja bem vindo,</Paragraph3>
                        <Title1 style={{color: '#FFF'}}>{user[0].nome}</Title1>
                        <Paragraph1 style={{ color: '#FFFFFF' }}><MaterialIcons name="location-pin" size={13} color="#fff" /> STR de Vitória da Conquista - BA</Paragraph1>
                        <Primary width='100%' title='Editar perfil' shadow={2} />
                    </Body>
                    <Footer>
                        <Scroll>
                            <ContainerItem style={{ backgroundColor: '#EDF1F6' }} onPress={() => { }}>
                                <ContainerItemIcon>
                                    <MaterialIcons name="location-pin" size={60} color="#666666" />
                                </ContainerItemIcon>
                                <Paragraph1 style={{ textAlign: 'center', fontWeight: '700', color: '#666' }}>Local de produção</Paragraph1>
                            </ContainerItem>
                            <ContainerItem style={{ backgroundColor: '#EDF1F6' }} onPress={() => navigate('ProductScreen')} >
                                <ContainerItemIcon>
                                    <MaterialCommunityIcons name="food-apple" size={60} color="#666666" />
                                </ContainerItemIcon>
                                <Paragraph1 style={{ textAlign: 'center', fontWeight: '700', color: '#666' }}>Produtos</Paragraph1>
                            </ContainerItem>
                            <ContainerItem style={{ backgroundColor: '#EDF1F6' }} onPress={() => { }}>
                                <ContainerItemIcon>
                                    <MaterialIcons name="qr-code-2" size={60} color="#666666" />
                                </ContainerItemIcon>
                                <Paragraph1 style={{ textAlign: 'center', fontWeight: '700', color: '#666' }}>Etiquetas</Paragraph1>
                            </ContainerItem>
                        </Scroll>
                    </Footer>
                </Container>
            {/* </LinearGradient> */}
        </ImageBackground>
    )
}