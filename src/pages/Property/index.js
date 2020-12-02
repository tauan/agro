import React, { useContext, useEffect, useState } from 'react'
import { showMessage } from "react-native-flash-message";
import axios from 'axios'
import { FlatList } from 'react-native'
import Primary from '../../components/Buttons/Primary'
import Header from '../../components/Header'
import Items from '../../components/Items'
import Search from '../../components/Search'
import UserContext from '../../contexs/User'
import Properties from '../../contexs/Properties'
import { App, Form, TitleStyle, TextStyle } from '../style'
import {
    Container,
    HeaderTitle,
} from './style'
import ModalMessage from '../../components/ModalMessage'

export default ({ navigation, route }) => {
    const [propertyList, setPropertiesList] = useState([])
    const [value, setValue] = useState('')
    const [activeModal, setActiveModal] = useState(false)
    const { user } = useContext(UserContext)
    const { propriedade, setPropriedade } = useContext(Properties)
    useEffect(() => {
        getPropertiesList()
    }, [])

    useEffect(() => {
        if (route.params.update === true) {
            getPropertiesList()
        }
    }, [route.params])

    const DeleteProperty = async () => {
        const options = {
            method: 'DELETE',
            url: 'https://dev.renovetecnologia.org/webrunstudio/WS_PROPRIEDADE.rule',
            params: { sys: 'SIS' },
            headers: {
                cookie: 'JSESSIONID=33BF2936814F3F4270DB0A969E12D473',
                Authorization: user.token,
                'Content-Type': 'application/json'
            },
            data: {
                id_agricultor: propriedade.id_agricultor,
                id_propriedade: propriedade.id_propriedade
            }
        };

        await axios.request(options).then(function (response) {
            response.data.sucesso && showMessage({
                message: 'Propriedade deletada com sucesso!',
                type: "success",
                style: { justifyContent: 'space-between', alignItems: 'center' },
                titleStyle: { fontSize: 16 },
                icon: { icon: "danger", position: 'right' },
                position: 'top',
                duration: 3000,
            })
            getPropertiesList()
        }).catch(function (error) {
            console.error(error);
        });
    }

    const getPropertiesList = async (id) => {
        await axios.get(`https://dev.renovetecnologia.org/webrunstudio/WS_PROPRIEDADE.rule?sys=SIS&JSON=%7B%20%22id_agricultor%22%3A%20${user.id_agricultor}%20%7D`, { headers: { authorization: user.token } })
            .then(({ data }) => {
                const propriedades = []
                if (Array.isArray(data)) {
                    data.map(async item => {
                        if (item.foto === "" && item.url != "") {
                            item.foto = item.url
                        }
                        propriedades.push(item)
                        if (propriedades.length === data.length) setPropertiesList(propriedades)
                    })
                }
            })
    }

    return (
        <>
            <Header color="#008b54" navigation={navigation} />
            <App>
                <Form style={{ flex: 1 }}>
                    <Container>
                        <HeaderTitle>
                            <TitleStyle>Locais de produção</TitleStyle>
                            <TextStyle>Cadastrar, excluir e editar locais de produção</TextStyle>
                        </HeaderTitle>
                        <Primary title={`Cadastrar Local`} width={150} onPress={() => {
                            setPropriedade({});
                            navigation.navigate("PropertiesForm")
                        }} />
                    </Container>
                    <Search value={value} onChangeText={text => setValue(text)} />
                    <FlatList
                        data={propertyList.filter(produto => produto.descricao.indexOf(value.toUpperCase()) != -1)}
                        renderItem={({ item, index }) =>
                            <Items
                                item={item}
                                index={index}
                                onPress={() => {
                                    setPropriedade(item);
                                    navigation.navigate("PropertiesForm")
                                }}
                                deleteFunction={() => {
                                    setPropriedade(item);
                                    setActiveModal(true)
                                }} />
                        }
                        keyExtractor={(keyExtractor, index) => String(index)}
                        columnWrapperStyle={{ justifyContent: "space-between" }}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                    />
                </Form>
                {activeModal &&
                    <ModalMessage
                        showMessage={{
                            title: 'Atenção!',
                            message: `Deseja realmente deletar esta propriedade?`,
                            type: 'alert',
                            icon: true
                        }}
                        title="Deletar"
                        backgroundColor="#EB4D4D"
                        onPressPrimaryButton={(value) => { DeleteProperty(); setActiveModal(false) }}
                        setActiveModal={setActiveModal}  >
                    </ModalMessage>}

            </App >
        </>
    )
}