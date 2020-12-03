import React, { useContext, useEffect } from 'react'
import { ImageBackground } from 'react-native'
import Primary from '../../components/Buttons/Primary'
import LinearGradient from 'react-native-linear-gradient'
import Link from '../../components/Buttons/Link'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import UserContext from '../../contexs/User'
import AuthContext from '../../contexs/Auth'
import BKG from './assets/background.jpg'
import LogoContag from './assets/logo.png'
import CheckSession from '../../utils/CheckSession'

import {
    TitleStyle,
    TextStyle,
    CleanContainer,
    Form
} from '../style'

import {
    IMGUser,
    ContainerIMG,
    Body,
    Container,
    ContainerButtons,
    ContainerItem,
    Header,
    Logo,
} from './style'

export default ({ navigation }) => {
    const { user } = useContext(UserContext)
    const { logout, logoutWithoutAuthorization } = useContext(AuthContext)
    const { navigate } = navigation
    const img = user.foto != null ? user.foto : 'https://dev.renovetecnologia.org/imagens/image.jpg'

    useEffect(() => { CheckSession(user.token, logoutWithoutAuthorization); }, [])
    const name = user.nome.split(" ")
    return (
        // <ImageBackground source={BKG} style={{ flex: 1 }}>
        <LinearGradient colors={['#fff', '#fff']} start={{ x: 0.30, y: 0.25 }} end={{ x: 0.0, y: 1.2 }} style={{ flex: 1, justifyContent: 'center' }}>
            <Container style={{ padding: 15 }}>
                <Header style={{ justifyContent: 'center', position: 'absolute', top: 25 }}>
                    <CleanContainer style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 10,
                        borderBottomWidth: 0.5,
                        borderColor: '#82A094',
                        paddingBottom: 10
                    }}>
                        <ContainerIMG style={{ marginRight: 10 }} >
                            <IMGUser source={{ uri: img }} />
                        </ContainerIMG>
                        <CleanContainer>
                            <TextStyle fontsize={16}>Olá, </TextStyle>
                            <TitleStyle fontsize={18} >{`${name[0]} ${name[1]}`}</TitleStyle>
                        </CleanContainer>
                        <Link
                            icon={true}
                            title='Sair'
                            color="#82A094"
                            onPress={() => logout()}
                            width={80}
                        />
                    </CleanContainer>
                </Header>
                <Body >
                    <ContainerButtons direction="row">
                        <ContainerItem background="#008b54" onPress={() => navigate('PropertyScreen', { update: false })}>
                            <MaterialCommunityIcons name="home-map-marker" size={60} color="#fff" />
                            <TextStyle align="center" color="#fff">Locais de produção</TextStyle>
                        </ContainerItem>
                        <ContainerItem background="#008b54" onPress={() => navigate('ProductScreen', { update: false })} >
                            <FontAwesome5 name="apple-alt" size={50} color="#fff" />
                            <TextStyle align="center" color="#fff">Produtos</TextStyle>
                        </ContainerItem>
                        <ContainerItem background="#008b54" onPress={() => navigate('TagsScreen', { update: false })}>
                            <MaterialIcons name="qr-code-2" size={50} color="#fff" />
                            <TextStyle align="center" color="#fff">Etiquetas</TextStyle>
                        </ContainerItem>
                    </ContainerButtons>
                    <ContainerButtons style={{ marginTop: 18 }} direction="row">
                        <ContainerItem background="#008b54" onPress={() => navigate('ProfileForm')} >
                            <FontAwesome name="user-circle" size={50} color="#fff" />
                            <TextStyle align="center" color="#fff">Dados do usuário</TextStyle>
                        </ContainerItem>
                        <ContainerItem background="#008b54" onPress={() => { }}>
                            <MaterialCommunityIcons name="book-open-page-variant" size={60} color="#fff" />
                            <TextStyle align="center" color="#fff">Caderno de campo</TextStyle>
                        </ContainerItem>
                        <ContainerItem background="#008b54" onPress={() => { }}>
                            <MaterialIcons name="help" size={50} color="#fff" />
                            <TextStyle align="center" color="#fff">sobre</TextStyle>
                        </ContainerItem>
                    </ContainerButtons>
                </Body>
                    {/* <TextStyle style={{ paddingVertical: 10 }} fontsize={12}>{user.sindicato}</TextStyle> */}
                {/* <Form style={{ alignItems: 'center', position: 'absolute', bottom: 25 }}>
                    <Logo source={LogoContag} />
                </Form> */}
            </Container >
        </LinearGradient>
        //</ImageBackground>
    )
}