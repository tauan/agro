import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { FlatList, } from 'react-native'
import Primary from '../../components/Buttons/Primary'
import Header from '../../components/Header'
import Items from '../../components/Items'
import Search from '../../components/Search'
import UserContext from '../../contexs/User'
import ProductContext from '../../contexs/ProductContext'
import { App, Form, TitleStyle, TextStyle } from '../style'
import { Container, HeaderTitle } from './style'
import ModalMessage from '../../components/ModalMessage'
import {showMessage} from 'react-native-flash-message'

export default ({ navigation, route, routes }) => {
    const [productsList, setProductsList] = useState([])
    const [value, setValue] = useState('')
    const [activeModal, setActiveModal] = useState(false)
    const { setProduto, produto } = useContext(ProductContext)
    const { user } = useContext(UserContext)

    useEffect(() => {
        setProduto(defaultProductContext)
        getProductList();
    }, [])

    useEffect(()=> {
        if(route.params.update === true) {
            getProductList()
        }
    }, [route.params])

    const defaultProductContext = {
        id_produto: null,
        id_agricultor: user.id_agricultor,
        id_categoria: null,
        descricao: "",
        gluten: "",
        peso_liquido: "",
        peso_bruto: "",
        codigo_barras: "",
        dias_validade: "",
        foto: "",
        url_imagem: "https://dev.renovetecnologia.org/imagens/image.jpg",
        observacao: "",
        id_produto_base: null,
        mes_inicial_plantio: "",
        mes_final_plantio: "",
        tipo_producao: null,
        unidade_medida_1: null,
        unidade_medida_2: null,
        quantidade_producao: "",
        in_natura: [],
        propriedades: []
    }

    const getProductList = async (id) => {
        try {
            const productBase = await axios.get("https://dev.renovetecnologia.org/webrunstudio/WS_PRODUTOS_BASE.rule?sys=SIS", { headers: { authorization: user.token } })
            const response = await axios.get(`https://dev.renovetecnologia.org/webrunstudio/WS_PRODUTOS.rule?sys=SIS&JSON=%7B%20%22id_agricultor%22%3A%20${user.id_agricultor}%20%7D`, { headers: { contentType: "application/json" , authorization: user.token } })

            const checkExistImageAndSetList = async array => {
                const tempProductList = []
                await array.map(item => {
                    if(item.url_imagem === "" || item.url_imagem === undefined)  {
                        if(productBase.data && Array.isArray(productBase.data))
                            productBase.data.map(pb => { 
                                if(item.id_produto_base === pb.id_produto_base) item.url_imagem = pb.url
                            })
                    }
                    tempProductList.push(item)
                })
                setProductsList(tempProductList)
            }
            if(response.status !== undefined && response.status === 200) 
                if(Array.isArray(response.data)) checkExistImageAndSetList(response.data) 
        }catch(err) { console.log("erro na listagem de produtos"); getProductList() }
    }

    const deleteProduct = async () => {
        if(produto.id_produto !== null) {
            try{
                const options = {
                    method: "DELETE",
                    url: "https://dev.renovetecnologia.org/webrunstudio/WS_PRODUTOS.rule?sys=SIS",
                    headers: {
                        authorization: user.token
                    },
                    data: {
                        id_agricultor: produto.id_agricultor,
                        id_produto: produto.id_produto
                    }
                }
                const response = await axios.request(options)
                if(response.data.sucesso) {
                    getProductList();
                    showMessage({
                        message: 'Produto deletado com sucesso!',
                        type: "success",
                        style: { justifyContent: 'space-between', alignItems: 'center' },
                        titleStyle: { fontSize: 16 },
                        icon: { icon: "success", position: 'right' },
                        position: 'top',
                        duration: 3000,
                    })
                }

                

            } catch(err) {}
        }
    }

    const setParsedItem = item => {
        item.unidade_medida_1 = parseInt(item.unidade_medida_1); 
        item.unidade_medida_2 = parseInt(item.unidade_medida_2); 
        
        setProduto(item)
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
                        <Primary title="Cadastrar produto" width={150} onPress={() => { setProduto(defaultProductContext); navigation.navigate("ProductForm") }} />
                    </Container>
                    <Search value={value} onChangeText={text => setValue(text)} />
                    {(Array.isArray(productsList) && productsList.length > 0) && 
                    <FlatList
                        data={productsList.filter(produto => produto.descricao.indexOf(value.toUpperCase()) != -1)}
                        renderItem={({ item, index }) =>
                            <Items item={item} index={index} onPress={() => { setParsedItem(item); navigation.navigate("ProductForm") }} deleteFunction={() =>{ setProduto(item); setActiveModal(true)}} />
                        }
                        keyExtractor={(keyExtractor, index) => String(index)}
                        columnWrapperStyle={{ justifyContent: "space-between" }}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                    />}
                    {(!Array.isArray(productsList) || productsList.length === 0) && (
                        <Form style={{alignItems:"center"}}>
                            <TextStyle text-align="center">Nenhum produto cadastrado</TextStyle>
                        </Form>
                    )
                    }

                    
                </Form>
                {activeModal &&
                    <ModalMessage
                        showMessage={{
                            title: 'Atenção!',
                            message: `Deseja realmente deletar este produto?`,
                            type: 'alert',
                            icon: true
                        }}
                        title="Deletar"
                        onPressPrimaryButton={() => deleteProduct()}
                        setActiveModal={setActiveModal} />}

            </App >
        </>
    )
}