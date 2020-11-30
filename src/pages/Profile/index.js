import React from 'react'
import Primary from '../../components/Buttons/Primary'
import Header from '../../components/Header'
import { App, Form, TitleStyle, TextStyle, } from '../style'
import {
  Container,
  HeaderTitle,
} from './style'

export default ({ navigation }) => {

  return (
    <>
      <Header color="#008b54" navigation={navigation} />
      <App >
        {/* <Img source={{ uri: 'https://dev.renovetecnologia.org/imagens/profile.png' }} style={{ flex: 1, width: '100%' }} /> */}
        <Form style={{ flex: 1, width: '100%' }}>
          <Container style={{ flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <HeaderTitle style={{ width: '100%' }}>
              <TitleStyle align="center">Perfil</TitleStyle>
              <TextStyle fontsize={20} align="center">Atualizar dados do usuário</TextStyle>
            </HeaderTitle>
            <Primary title={`Atualizar`} width={'100%'} onPress={() => {
              navigation.navigate("ProfileForm"); 
            }} />
          </Container>
        </Form >
      </App >
    </>
  )
}