import React, { useEffect, useContext } from 'react'
import { ActivityIndicator } from 'react-native'
import axios from 'axios'
import Header from '../../components/Header'
import UserContext from '../../contexs/User'
import { App, Form, TitleStyle, TextStyle, } from '../style'
import {
  Container,
  HeaderTitle,
} from './style'

export default ({ navigation }) => {
  const { user, setProfile } = useContext(UserContext)

  useEffect(() => {
    setTimeout(function () { navigation.navigate("ProfileForm") }, 2000)
    GetDataUser()
  }, [])

  const GetDataUser = async () => {
    const { data } = await axios.get(`https://dev.renovetecnologia.org/webrunstudio/WS_AGRICULTOR.rule?sys=SIS&JSON=%7B%20%22id_agricultor%22%3A%20${user.id_agricultor}%20%7D`, { headers: { authorization: user.token } })
    setProfile(data)
  }

  return (
    <>
    
      {/* <Header color="#008b54" navigation={navigation} /> */}
      <App >
        {/* <Img source={{ uri: 'https://dev.renovetecnologia.org/imagens/profile.png' }} style={{ flex: 1, width: '100%' }} /> */}
        <Form style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Container style={{ flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <HeaderTitle style={{ width: '100%' }}>
              <TitleStyle align="center">Aguade...</TitleStyle>
              <ActivityIndicator size={50} color="#008b54" />
              <TextStyle fontsize={18} align="center">Estamos preparando tudo para você!</TextStyle>
            </HeaderTitle>
          </Container>
        </Form >
      </App >
    </>
  )
}