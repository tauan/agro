import React, { useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'

import Picker from '../../components/Picker'
import InputAnimated from '../../components/InputAnimated'
import Primary from '../../components/Buttons/Primary'
import Link from '../../components/Buttons/Link'

import { App, Form, Title, ImgRegister } from './style'


const Register = props => {
    const [nome, setNome] = useState()
    const [cpf_cnpj, setCPF_CNPJ] = useState()
    const [sexo, setSexo] = useState()
    const [senha, setSenha] = useState()
    const [confirmar_senha, setConfirmar_Senha] = useState()
    return (
        <App>
            <KeyboardAvoidingView>
                <Form>
                    <ImgRegister />
                    <Title>Criar Conta</Title>
                    <InputAnimated
                        placeholder='Nome'
                        onChangeText={text => setNome(text)}
                        value={nome}
                    />
                    <InputAnimated
                        placeholder='CPF/CNPJ'
                        onChangeText={text => setCPF_CNPJ(text)}
                        value={cpf_cnpj}
                    />
                    <Picker
                        placeholder='Sexo'
                        listOptions={['Masculino', 'Feminino', 'Não-binário']}
                        onValueChange={text => setSexo(text)}
                        value={sexo}
                    />
                    <InputAnimated
                        placeholder='Senha'
                        onChangeText={text => setSenha(text)}
                        value={senha}
                        secureTextEntry={true}
                    />
                    <InputAnimated
                        placeholder='Confirmar senha'
                        onChangeText={text => setConfirmar_Senha(text)}
                        value={confirmar_senha}
                        secureTextEntry={true}
                    />
                    <Primary title='Enviar' shadow={2} />
                </Form>
            </KeyboardAvoidingView>
            <Link title='Cancelar' />
        </App>
    )
}

export default Register