import React, {useEffect, useContext} from 'react'
import {ActivityIndicator} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import {Container, LogoContainer, LogoImage, StatusContainer} from './style'
import {TextStyle} from '../style'
import UserContext from '../../contexs/User'
import AuthContext from '../../contexs/Auth'

export default ({navigation}) => {
  useEffect(() => { 
    const timer = setTimeout(() => checkSavedUser(), 2000);
    return () => clearTimeout(timer);
  },[])
  const { user, setUser } = useContext(UserContext)
  const { setLoged } = useContext(AuthContext)
  const checkSavedUser = async () => {
    try { 
      const userJson = await AsyncStorage.getItem('@user')
      const user = JSON.parse(userJson)
      await setUser(user)
      userJson !== null ? setLoged(true) : navigation.navigate("LoginScreen")
    } catch(e) {
      console.log(`Identificamos o seguinte erro na checkagem: ${e}`)
    }
  }
  return (
    <Container>
      <LogoContainer>
        <LogoImage />
      </LogoContainer>
      <StatusContainer>
        <TextStyle color="#008b54" style={{lineHeight: 30, marginRight: 10}}>Aguarde</TextStyle>
        <ActivityIndicator size={25} color="#008b54" />
      </StatusContainer>
      
    </Container>
  ) 
}