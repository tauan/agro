import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { FlatList, ImageBackground } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Primary from '../../components/Buttons/Primary'
import Header from '../../components/Header'
import Items from '../../components/Items'
import Search from '../../components/Search'
import UserContext from '../../contexs/User'

import { App, Form, TitleStyle, TextStyle } from '../style'
import {
    Container,
    HeaderTitle,
    DetailsContainer,
    Section, 
    HeaderCard,
    BodyCard,
    FilterContainer,
    Item,
    Button,
    TextButton,
    CloseButton
} from './style'
import ModalMessage from '../../components/ModalMessage'

export default ({ navigation }) => {
    const [list, setList] = useState([])
    const [value, setValue] = useState('')
    const [activeModal, setActiveModal] = useState(false)
    const [activeDetails, setActiveDetails] = useState(false)
    const [item, setItem] = useState()

    useEffect(() => { getList() }, [])
    const getList = () => axios.get("http://localhost:3000/products").then(({ data }) => setList(data))

    const { user } = useContext(UserContext)

    return (
        <>
            <Header navigation={navigation} />
            <App>
                <Form style={{ flex: 1 }}>
                    <Container>
                        <HeaderTitle>
                            <TitleStyle>Produtos</TitleStyle>
                            <TextStyle>Cadastrar, excluir e editar produtos</TextStyle>
                        </HeaderTitle>
                        <Primary title="Cadastrar produto" width={150} onPress={() => console.log(user)} />
                    </Container>
                    <Search value={value} onChangeText={text => setValue(text)} />
                    <FlatList
                        data={list.filter(produto => produto.title.indexOf(value) != -1)}
                        renderItem={({ item, index }) => <Items
                            item={item}
                            index={index}
                            onPress={() => { setActiveDetails(true); setItem(item) }}
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
                {activeDetails &&
                    <ModalMessage onPress={() => { setActiveDetails(false); }} >
                        <DetailsContainer>
                            <ImageBackground style={{ width: '100%' }} source={{ uri: item.image }}>
                                <FilterContainer>
                                    <CloseButton onPress={() => setActiveDetails(false)}>
                                        <MaterialIcons size={24} name='close' color='#fff' />
                                    </CloseButton>
                                    <HeaderCard>
                                        <TitleStyle color="#fff" fontsize={36}>{item.title}</TitleStyle>
                                        <TextStyle color="#fff">{item.property}</TextStyle>
                                    </HeaderCard>
                                    <BodyCard>
                                        <Section style={{ paddingHorizontal: 15 }}>
                                            <Item>
                                                <TextStyle color="#fff" fontsize={16}>Peso Líquido</TextStyle>
                                                <TitleStyle color="#fff" fontsize={36}>{item.net_weight_product}<TextStyle color="#fff" fontsize={18}>{item.unit_product}</TextStyle></TitleStyle>
                                            </Item>
                                            <Item>
                                                <TextStyle color="#fff" fontsize={16}>Produção</TextStyle>
                                                <TitleStyle color="#fff" fontsize={36}>{item.production}<TextStyle color="#fff" fontsize={18}>{item.unit_production}</TextStyle></TitleStyle>
                                            </Item>
                                            <Item>
                                                <TextStyle color="#fff" fontsize={16}>Validade</TextStyle>
                                                <TitleStyle color="#fff" fontsize={36}>{item.production}<TextStyle color="#fff" fontsize={18}> dias</TextStyle></TitleStyle>
                                            </Item>
                                        </Section>
                                        <Section background="#ffffff">
                                            <Button background="transparent" marginTop={0} borderRadius={10} onPress={() => alert('Ola!!!')}>
                                                <TextButton >Editar Produto</TextButton>
                                            </Button>
                                            <Button marginTop={0} borderRadius={10}>
                                                <MaterialIcons name="qr-code-2" size={24} color="#fff" /><TextButton color="#fff"> Criar Etiquetas</TextButton>
                                            </Button>
                                        </Section>
                                    </BodyCard>
                                </FilterContainer>
                            </ImageBackground>
                        </DetailsContainer>
                    </ModalMessage>}
            </App >
        </>
    )
}