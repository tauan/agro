import React, { useState } from 'react'
import { KeyboardAvoidingView, ScrollView } from 'react-native'

import AnimatedDropDown from '../../components/AnimatedDropDown'
import InputAnimated from '../../components/InputAnimated'
import Primary from '../../components/Buttons/Primary'
import Header from '../../components/Header'
import Link from '../../components/Buttons/Link'

import { App, Form, TitleStyle } from '../style'
import { ImgRegister } from './style'

export default ({ navigation }) => {
    const [nome, setNome] = useState()
    const [cpf_cnpj, setCPF_CNPJ] = useState()
    const [sexo, setSexo] = useState()
    const [senha, setSenha] = useState()
    const [confirmar_senha, setConfirmar_Senha] = useState()
    const { navigate } = navigation

    return (
        <>
            <Header title="Registro" navigation={navigation} />
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} showsVerticalScrollIndicator={false}>
                <App>
                    <ImgRegister />
                    <Form>
                        <KeyboardAvoidingView>
                            <TitleStyle>Criar Conta</TitleStyle>
                            <AnimatedDropDown
                                defaultValue={sexo}
                                placeholder="Sindicato"
                                onChangeItem={text => setSexo(text)}
                                listOptions={['Masculino', 'Feminino']} />
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
                            <AnimatedDropDown
                                defaultValue={sexo}
                                placeholder="Sexo"
                                onChangeItem={text => setSexo(text)}
                                listOptions={['Masculino', 'Feminino']} />
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
                        </KeyboardAvoidingView>
                    </Form>
                    <Link title='Cancelar' onPress={() => navigate('LoginScreen')} />
                </App>
            </ScrollView>
        </>
    )
}