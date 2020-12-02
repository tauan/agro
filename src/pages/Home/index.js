import React, { useContext, useEffect } from 'react'
import { ImageBackground } from 'react-native'
import Primary from '../../components/Buttons/Primary'
import LinearGradient from 'react-native-linear-gradient'
import Link from '../../components/Buttons/Link'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import UserContext from '../../contexs/User'
import AuthContext from '../../contexs/Auth'
import BKG from './assets/background.jpg'
import LogoContag from './assets/logo.png'
import CheckSession from '../../utils/CheckSession'

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
    const { logout, logoutWithoutAuthorization } = useContext(AuthContext)
    const { navigate } = navigation
    const img = user.foto != null ? user.foto : 'https://dev.renovetecnologia.org/imagens/image.jpg'

    useEffect(() => { CheckSession(user.token, logoutWithoutAuthorization); }, [])

    return (
        // <ImageBackground source={BKG} style={{ flex: 1 }}>
        <LinearGradient colors={['#fff', '#fff']} start={{ x: 0.30, y: 0.25 }} end={{ x: 0.0, y: 1.2 }} style={{ flex: 1, justifyContent: 'center' }}>
            <Container>
                    {/* <Logo source={LogoContag} /> */}
                <Body >
                    <Header>
                        <ContainerIMG >
                            <IMGUser source={{ uri: img }} />
                        </ContainerIMG>
                        <TitleStyle style={{ marginTop: 15, width: '100%' }} numberOfLines={1} fontsize={24} align="center">{user.nome}</TitleStyle>
                        <TextStyle>{user.sindicato}</TextStyle>
                        <Primary width="100%" onPress={() => navigate('ProfileForm')} title='Editar perfil' fontsize={18} />
                        <Link title='Desconectar' color="#050505" onPress={() => logout()} width={110} />
                    </Header>
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
                </Body>
            </Container >
        </LinearGradient>
        //</ImageBackground>
    )
}