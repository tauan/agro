import React from 'react'
import {KeyboardAvoidingView} from 'react-native'

import InputAnimated from '../../components/InputAnimated'
import Primary from '../../components/Buttons/Primary'
import Link from '../../components/Buttons/Link'

import {App, Form, Logo} from './style'


const LoginScren = () => (
  <App>
    <Logo />
    <KeyboardAvoidingView>
      <Form>
        <InputAnimated
          placeholder='Email'
          keyboardType='email-address'
          marginTop={0}
        />
        <InputAnimated
          placeholder='Senha'
          secureTextEntry={true}
        />
        <Primary title='Login' shadow={2} />
      </Form>
    </KeyboardAvoidingView>
    <Link title='Recuperar senha' />
  </App>)

export default LoginScren