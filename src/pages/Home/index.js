import React, { useContext } from 'react'
import Primary from '../../components/Buttons/Primary'
import Header from '../../components/Header'
import Image from './user.jpg'
import Icon from 'react-native-vector-icons/MaterialIcons'
import UserContext from '../../contexs/User'

import { Title1, Paragraph1, Paragraph3 } from '../style'
import { IMGUser, ContainerIMG, Body, Footer, Container, Scroll, ContainerItem, ContainerItemIcon } from './style'

export default ({ navigation }) => {
    // const { user } = useContext(UserContext)
    return (
        <>
            <Header title="Início" navigation={navigation} />
            <Container>
                <Primary title='Desconectar' marginRight={20} backgroundColor="#F43D3D" width={150} shadow={2} />
                <Body>
                    <ContainerIMG >
                        <IMGUser source={Image} />
                    </ContainerIMG>
                    <Paragraph3 style={{ fontWeight: '200' }}>Seja bem vindo,</Paragraph3>
                    <Title1>{'Marcos Alexandre Barbosa'}</Title1>
                    <Paragraph1 style={{ fontWeight: '200' }}>STR de Vitória da Conquista - BA</Paragraph1>
                    <Primary width='100%' title='Editar perfil' shadow={2} />
                </Body>
                <Footer>
                    <Scroll>
                        <ContainerItem>
                            <ContainerItemIcon>
                                <Icon name="home" size={35} color="#949695" />
                            </ContainerItemIcon>
                            <Paragraph1>Propriedades</Paragraph1>
                        </ContainerItem>
                        <ContainerItem>
                            <ContainerItemIcon>
                                <Icon name="home" size={35} color="#949695" />
                            </ContainerItemIcon>
                            <Paragraph1>Propriedades</Paragraph1>
                        </ContainerItem>
                        <ContainerItem>
                            <ContainerItemIcon>
                                <Icon name="home" size={35} color="#949695" />
                            </ContainerItemIcon>
                            <Paragraph1>Propriedades</Paragraph1>
                        </ContainerItem>
                    </Scroll>
                </Footer>
            </Container>
        </>
    )
}