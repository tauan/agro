import React, { useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'

import InputAnimated from '../../components/InputAnimated'
import Primary from '../../components/Buttons/Primary'
import Link from '../../components/Buttons/Link'

import { App, Form } from '../style'
import { Logo } from './style'

export default ({ navigation }) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const { navigate } = navigation
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
      <Link title='Recuperar senha' onPress={() => navigate('ProductsScreen')} />
      <Link
        title='Cadastrar'
        backgroundColor='#fff'
        color="#07AC82"
        borderWidth={1}
        borderColor="#07AC82"
        marginTop={50}
        onPress={() => navigate('RegisterScreen')} />
    </App>
  )
}