import React, { useContext, useEffect, useState } from 'react'
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

export default ({ navigation }) => {
    const [propertyList, setPropertyList] = useState([])
    const [value, setValue] = useState('')
    const [activeModal, setActiveModal] = useState(false)
    const { user } = useContext(UserContext)
    const { propriedade, setPropriedade } = useContext(Properties)

    useEffect(() => { getPropertyList() }, [])

    const getPropertyList = async (id) => {
        axios.get(`http://dev.renovetecnologia.org:8049/webrunstudio/WS_PROPRIEDADE.rule?sys=SIS&JSON=%7B%20%22id_agricultor%22%3A%20${user.id_agricultor}%20%7D`, { headers: { authorization: user.token } })
            .then(({ data }) => {
                const propriedades = []
                if (Array.isArray(data)) {
                    data.map(async item => {
                        if (item.foto === "" && item.url != "") {
                            item.foto = item.url
                        } else {
                            item.foto = 'http://dev.renovetecnologia.org:8049/imagens/image.jpg'
                        }
                        propriedades.push(item)
                        if (propriedades.length === data.length) setPropertyList(propriedades)
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
                        <Primary title="Cadastrar produto" width={150} onPress={() => { setPropriedade({}); navigation.navigate("PropertiesForm") }} />
                    </Container>
                    <Search value={value} onChangeText={text => setValue(text)} />
                    <FlatList
                        data={propertyList.filter(produto => produto.descricao.indexOf(value) != -1)}
                        renderItem={({ item, index }) =>
                            <Items item={item} index={index} onPress={() => { setPropriedade(item); navigation.navigate("PropertiesForm") }} deleteFunction={() => setActiveModal(true)} />
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
                            message: `Deseja realmente deletar a propriedade da lista?`,
                            type: 'alert',
                            icon: true
                        }}
                        onPressCancelButton={(value) => setActiveModal(value)} >
                    </ModalMessage>}

            </App >
        </>
    )
}