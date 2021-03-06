import React, { useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'

import InputAnimated from '../../components/InputAnimated'
import Primary from '../../components/Buttons/Primary'
import Header from '../../components/Header'
import Link from '../../components/Buttons/Link'

import { App, Form, TitleStyle } from '../style'
import { ImgForgot } from './style'

export default ({ navigation }) => {
    const [cpf_cnpj, setCPF_CNPJ] = useState()
    const { navigate } = navigation
    return (
        <>
            <Header title="Senha" navigation={navigation} />
            <App>
                <ImgForgot />
                <Form>
                    <KeyboardAvoidingView>
                        <TitleStyle>Recuperar senha</TitleStyle>
                        <InputAnimated
                            placeholder='CPF/CNPJ'
                            onChangeText={text => setCPF_CNPJ(text)}
                            value={cpf_cnpj}
                        />
                        <Primary title='Enviar' shadow={2} />
                    </KeyboardAvoidingView>
                </Form>
                <Link title='Cancelar' onPress={() => navigate('LoginScreen')} />
            </App>
        </>
    )
}