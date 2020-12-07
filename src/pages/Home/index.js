import React, { useContext, useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Link from '../../components/Buttons/Link'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import UserContext from '../../contexs/User'
import AuthContext from '../../contexs/Auth'
import LogoContag from './assets/logo.png'
import CheckSession from '../../utils/CheckSession'

import {
    TitleStyle,
    TextStyle,
    CleanContainer,
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
        <LinearGradient colors={['#F4F6F7', '#F4F6F7']} start={{ x: 0.30, y: 0.25 }} end={{ x: 0.0, y: 1.2 }} style={{ flex: 1, justifyContent: 'center' }}>
            <Header style={{ height: 100, justifyContent: 'center', alignItems: 'flex-end' }}>
                <CleanContainer style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    paddingHorizontal: 20,
                    paddingBottom: 18,
                    backgroundColor: '#fff',
                    elevation: 1
                }}>
                    <ContainerIMG style={{ marginRight: 10 }} >
                        <IMGUser source={{ uri: img }} />
                    </ContainerIMG>
                    <CleanContainer style={{ top: -5 }}>
                        <TextStyle color="#707b7c" fontsize={24}>Olá, <TitleStyle color="#1E8449" fontsize={24} >{`${name[0]}`}</TitleStyle></TextStyle>
                        <TextStyle color="#707b7c" fontsize={12}>{user.sindicato ? user.sindicato : user.email}</TextStyle>
                    </CleanContainer>
                    <Link
                        borderRadius={5}
                        title='Sair'
                        color="#1E8449"
                        onPress={() => logout()}
                        width={40}
                    />
                </CleanContainer>
            </Header>
            <Container>
                <Body style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'flex-start', paddingHorizontal: 20 }}>
                    <ContainerButtons direction="row">
                        <ContainerItem onPress={() => navigate('PropertyScreen', { update: false })}>
                            <MaterialCommunityIcons name="home-map-marker" size={60} color="#909497" />
                            <TextStyle align="center" color="#909497">Locais de produção</TextStyle>
                        </ContainerItem>
                        <ContainerItem onPress={() => navigate('ProductScreen', { update: false })} >
                            <MaterialCommunityIcons name="corn" size={60} color="#909497" />
                            <TextStyle align="center" color="#909497">Produtos</TextStyle>
                        </ContainerItem>
                        <ContainerItem onPress={() => navigate('TagsScreen', { update: false })}>
                            <MaterialCommunityIcons name="qrcode-scan" size={50} color="#909497" />
                            <TextStyle align="center" color="#909497">Etiquetas</TextStyle>
                        </ContainerItem>
                    </ContainerButtons>
                    <ContainerButtons style={{ marginTop: 18 }} direction="row">
                        <ContainerItem onPress={() => navigate('ProfileForm')} >
                            <Octicons name="person" size={60} color="#909497" />
                            <TextStyle align="center" color="#909497">Dados do usuário</TextStyle>
                        </ContainerItem>
                        <ContainerItem onPress={() => { }}>
                            <MaterialCommunityIcons name="book-open-page-variant" size={60} color="#909497" />
                            <TextStyle align="center" color="#909497">Caderno de campo</TextStyle>
                        </ContainerItem>
                        <ContainerItem onPress={() => { }}>
                            <MaterialIcons name="help" size={60} color="#909497" />
                            <TextStyle align="center" color="#909497">sobre</TextStyle>
                        </ContainerItem>
                    </ContainerButtons>
                </Body>
                <Logo style={{ marginBottom: 30 }} source={LogoContag} />
            </Container >
        </LinearGradient>
    )
}