import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import { FlatList } from 'react-native'
import Primary from '../../components/Buttons/Primary'
import Header from '../../components/Header'
import Items from '../../components/Items'
import UserContext from '../../contexs/User'

import { App, Form, Title1, Paragraph2 } from '../style'
import { Container, HeaderTitle } from './style'

export default ({ navigation }) => {
    const [lista, setLista] = useState([])
    useEffect(()=>{
    axios.get("http://localhost:3000/products").then(({data})=> setLista(data))
    })
    const {user} = useContext(UserContext)
    return (
        <>
            <Header title="Produtos" navigation={navigation} />
            <App>
                <Form style={{ flex: 1 }}>
                    <Container>
                        <HeaderTitle>
                            <Title1>Produtos</Title1>
                            <Paragraph2>Cadastrar, excluir e editar produtos</Paragraph2>
                        </HeaderTitle>
                        <Primary title="Cadastrar produto" width={150} onPress={()=>console.log(user)} />
                    </Container>
                    <FlatList
                        data={lista}
                        renderItem={({ item }) => <Items item= {item} onPress={()=>console.log(`Press item: ${item.id}`)} deleteFunction={()=>console.log(`Delete item: ${item.id}`)} />}
                        keyExtractor={(keyExtractor, index) => String(index)}
                        columnWrapperStyle={{ justifyContent: "space-between" }}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                    />
                </Form>
            </App>
        </>
    )
}