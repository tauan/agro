import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { FlatList } from 'react-native'
import Primary from '../../components/Buttons/Primary'
import Header from '../../components/Header'
import Items from '../../components/Items'
import Search from '../../components/Search'
import UserContext from '../../contexs/User'

import { App, Form, Title1, Text2 } from '../style'
import { Container, HeaderTitle } from './style'
import ModalMessage from '../../components/ModalMessage'

export default ({ navigation }) => {
    const [lista, setLista] = useState([])
    const [value, setValue] = useState('')
    const [activeModal, setActiveModal] = useState(false)
    const [item, setItem] = useState()


    useEffect(() => {
        axios.get("http://localhost:3000/products").then(({ data }) => setLista(data))
    }, [])

    const { user } = useContext(UserContext)

    return (
        <>
            <Header title="Produtos" navigation={navigation} />
            <App>
                <Form style={{ flex: 1 }}>
                    <Container>
                        <HeaderTitle>
                            <Title1>Produtos</Title1>
                            <Text2>Cadastrar, excluir e editar produtos</Text2>
                        </HeaderTitle>
                        <Primary title="Cadastrar produto" width={150} onPress={() => console.log(user)} />
                    </Container>
                    <Search value={value} onChangeText={text => setValue(text)} />
                    <FlatList
                        data={lista.filter(produto => produto.title.indexOf(value) != -1)}
                        renderItem={({ item }) =>
                            <Items
                                item={item}
                                onPress={() => { }}
                                deleteFunction={() => { setActiveModal(true); setItem(item) }} />
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
                            message: `Deseja realmente deletar o produto ${item.title} da lista?`,
                            type: 'alert',
                            icon: true
                        }}
                        onPress={() => { setActiveModal(false); }} >
                    </ModalMessage>}
            </App>
        </>
    )
}