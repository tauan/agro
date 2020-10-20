import React, { useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'

import InputAnimated from '../../components/InputAnimated'
import Primary from '../../components/Buttons/Primary'
import Link from '../../components/Buttons/Link'

import { App, Form, Logo, LogoContag, Container } from './style'


const LoginScren = props => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  return (
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
          <Primary title='Login' shadow={2} />
        </Form>
      </KeyboardAvoidingView>
      <Link title='Recuperar senha' />
      <Container>
        <LogoContag />
      </Container>
    </App>
  )
}

export default LoginScren