import React, { useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'

import InputAnimated from '../../components/InputAnimated'
import Primary from '../../components/Buttons/Primary'
import Link from '../../components/Buttons/Link'
import Header from '../../components/Header'

import { App, Form, Logo, LogoContag, Container } from './style'


export default ({navigation}) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const { navigate } = navigation
  return (
    <>
    <Header title="Login" navigation={navigation} />
    <App>
      <Logo />
      <KeyboardAvoidingView>
        <Form>
          <InputAnimated
            placeholder='Email'
            keyboardType='email-address'
            onChangeText={text => setEmail(text)}
            value={email}
            marginTop={0}
          />
          <InputAnimated
            placeholder='Senha'
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry={true}
          />
          <Primary title='Login' shadow={2} onPress={()=>navigate('RegisterScreen')} />
        </Form>
      </KeyboardAvoidingView>
      <Link title='Recuperar senha' />
    </App>
    </>
  )
}