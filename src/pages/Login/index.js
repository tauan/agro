import React, { useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'

import InputAnimated from '../../components/InputAnimated'
import Primary from '../../components/Buttons/Primary'
import Link from '../../components/Buttons/Link'
import Header from '../../components/Header'

import { App, Form, Logo } from './style'

export default ({ navigation }) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const { navigate } = navigation
  return (
    <>
      {/* <Header title="Login" navigation={navigation} /> */}
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
        <Link title='Recuperar senha' onPress={() => navigate('PasswordScreen')} />
        <Link
          title='Cadastrar'
          backgroundColor='#fff'
          color="#07AC82"
          borderWidth={1}
          borderColor="#07AC82"
          marginTop={50}
          onPress={() => navigate('RegisterScreen')} />
      </App>
    </>
  )
}