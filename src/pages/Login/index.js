import React, { useState, useContext, useEffect } from 'react'
import { KeyboardAvoidingView, Text, Keyboard } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import AuthContext from '../../contexs/Auth'
import UserContext from '../../contexs/User'
import axios from 'axios'
import { showMessage } from "react-native-flash-message";

import InputAnimated from '../../components/InputAnimated'
import Primary from '../../components/Buttons/PrimaryTouchable'
import Link from '../../components/Buttons/Link'

import { App, Form } from '../style'
import { Logo } from './style'

export default ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [activeButton, setActiveButton] = useState(false)
  const { navigate } = navigation
  const { setLoged } = useContext(AuthContext)
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    checkForm()
  }, [email, password])

  const saveUser = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@user', jsonValue)
    } catch (e) {
      console.log(`Identificamos o seguinte erro: ${e}`)
    }
  }
  const checkForm = () => {
    let controller = true
    email === "" ? controller = false : ""
    password === "" ? controller = false : ""
    controller ? setActiveButton(true) : setActiveButton(false)
  }
  const submitForm = async () => {
    axios.post("https://dev.renovetecnologia.org/webrunstudio/WS_LOGIN.rule?sys=SIS", {
      usuario: email,
      senha: password
    }).then(async ({ data }) => {
      if (data.erro) {
        showMessage({
          message: data.erro,
          type: "danger",
          style: { justifyContent: 'space-between', alignItems: 'center' },
          titleStyle: { fontSize: 16 },
          icon: { icon: "danger", position: 'right' },
          position: 'top',
          duration: 3000,
        }), Keyboard.dismiss()
        return
      }
      await setUser(data)
      saveUser(data)
      setLoged(true)
    }).catch(err => console.log(err))
  }
  return (
    <App>
      {/* <Logo /> */}
      <Form>
        <KeyboardAvoidingView>
          <InputAnimated
            placeholder='Email'
            keyboardType='email-address'
            onChangeText={async text => {
              setEmail(text)
            }}
            required={true}
            value={email}
            marginTop={0}
          />
          <InputAnimated
            placeholder='Senha'
            onChangeText={text => setPassword(text)}
            value={password}
            valid='password'
            secureTextEntry={true}
          />
          <Primary
            title='Login'
            backgroundColor={activeButton ? '#008b54' : '#ccc'}
            onPress={() =>
              submitForm()}
            shadow={2}
            disabled={activeButton} />
        </KeyboardAvoidingView>
      </Form>
      <Link title='Recuperar senha' onPress={() => navigate('PasswordScreen')} />
      <Link
        title='Cadastrar'
        backgroundColor='#fff'
        color="#008b54"
        borderWidth={1}
        borderColor="#008b54"
        marginTop={50}
        onPress={() => navigate('RegisterScreen')} />
    </App>
  )
}