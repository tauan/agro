import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { FlatList, ImageBackground } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Primary from '../../components/Buttons/Primary'
import PrimaryTouchable from '../../components/Buttons/PrimaryTouchable'
import Header from '../../components/Header'
import Items from '../../components/Items'
import Search from '../../components/Search'
import UserContext from '../../contexs/User'
import ProductContext from '../../contexs/ProductContext'
import { App, Form, TitleStyle, TextStyle } from '../style'
import {
    Container,
    HeaderTitle,
} from './style'
import ModalMessage from '../../components/ModalMessage'

export default ({ navigation }) => {
    const [productsList, setProductsList] = useState([])
    const [value, setValue] = useState('')
    const [activeModal, setActiveModal] = useState(false)
    const { setProduto } = useContext(ProductContext)
    const { user } = useContext(UserContext)

    useEffect(() => { getProductList() }, [])

    const getProductList = async (id) => {
        axios.get(`http://dev.renovetecnologia.org:8049/webrunstudio/WS_PRODUTOS.rule?sys=SIS&JSON=%7B%20%22id_agricultor%22%3A%20${user.id_agricultor}%20%7D`, { headers: { authorization: user.token } })
            .then(({ data }) => {
                const produtoBase = []
                if (Array.isArray(data)) {
                    data.map(async item => {
                        if (item.foto === "" || item.foto === undefined) {
                            const { id_produto_base } = item
                            const result = await axios.get("http://dev.renovetecnologia.org:8049/webrunstudio/WS_PRODUTOS_BASE.rule?sys=SIS", { headers: { authorization: user.token } })

                            if (Array.isArray(result.data)) {
                                await result.data
                                    .filter(pBase => pBase.id_produto_base === id_produto_base)
                                    .map(obj => { item.foto = item.url_imagem == '' ? item.foto = obj.url : item.foto = item.url_imagem })
                                item.foto === '' && (item.foto = 'http://dev.renovetecnologia.org:8049/imagens/image.jpg')
                            }
                        }
                        produtoBase.push(item)
                        if (produtoBase.length === data.length) setProductsList(produtoBase)
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
                            <TitleStyle>Produtos</TitleStyle>
                            <TextStyle>Cadastrar, excluir e editar produtos</TextStyle>
                        </HeaderTitle>
                        <Primary title="Cadastrar produto" width={150} onPress={() => { setProduto({}); navigation.navigate("ProductForm") }} />
                    </Container>
                    <Search value={value} onChangeText={text => setValue(text)} />
                    <FlatList
                        data={productsList.filter(produto => produto.descricao.indexOf(value) != -1)}
                        renderItem={({ item, index }) =>
                            <Items item={item} index={index} onPress={() => { setProduto(item); navigation.navigate("ProductForm") }} deleteFunction={() => setActiveModal(true)} />
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
                            message: `Deseja realmente deletar o produto da lista?`,
                            type: 'alert',
                            icon: true
                        }}
                        onPressCancelButton={(value) => setTimeout(function () { setActiveModal(value); }, 800)} >
                    </ModalMessage>}

            </App >
        </>
    )
}