import React, { useState, useContext } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import AuthContext from '../../contexs/Auth'
import UserContext from '../../contexs/User'
import axios from 'axios'

import InputAnimated from '../../components/InputAnimated'
import Primary from '../../components/Buttons/Primary'
import Link from '../../components/Buttons/Link'

import { App, Form } from '../style'
import { Logo } from './style'

export default ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [activeButton, setActiveButton] = useState(false)
  const {navigate} = navigation
  const {setLoged} = useContext(AuthContext)
  const {user, setUser} = useContext(UserContext)

  const checkForm = () => {
    let controller = true 
    email === "" ? controller = false : ""
    password === "" ? controller = false : ""
    controller ? setActiveButton(true) : setActiveButton(false)
  }
  const showErrorMessage = message => {
    console.log("Erro ao conectar: " + message)
  }
  const submitForm = async () => {
    const {data} = await axios.post("http://localhost:3333/login", {
      username: email,
      senha: password
    })
    await setUser(data)
    data.error ? showErrorMessage(data.error) : ""
    data.nome ? setLoged(true) : ""
  }
  return (
    <App>
      <Logo />
      <KeyboardAvoidingView>
        <Form>
          <InputAnimated
            placeholder='Email'
            keyboardType='email-address'
            onChangeText={text => {
                setEmail(text)
                checkForm()
            }}
            value={email}
            marginTop={0}
          />
          <InputAnimated
            placeholder='Senha'
            onChangeText={text => {
              setPassword(text)
              checkForm()
            }}
            value={password}
            secureTextEntry={true}
          />
          {activeButton && <Primary title='Login' onPress={()=>submitForm()} shadow={2} />}
          {activeButton === false && <Primary title='Login' backgroundColor="#ccc" shadow={2} />}
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
  )
}