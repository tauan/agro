import React, { useState } from 'react'
import { FlatList } from 'react-native'
import Primary from '../../components/Buttons/Primary'
import Header from '../../components/Header'
import Items from '../../components/Items'

import { App, Form, Title1, Paragraph2 } from '../style'
import { Container, HeaderTitle } from './style'

export default ({ navigation }) => {
    return (
        <>
            <Header title="Produtos" navigation={navigation} />
            <App>
                <Form>
                    <Container>
                        <HeaderTitle>
                            <Title1>Produtos</Title1>
                            <Paragraph2>Cadastrar, excluir e editar produtos</Paragraph2>
                        </HeaderTitle>
                        <Primary title="Cadastrar produto" width={150} />
                    </Container>
                    <FlatList
                        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                        style={{ width: '100%', height: '90%' }}
                        renderItem={({ item }) => <Items />}
                        keyExtractor={(key, index) => String(index)}
                        columnWrapperStyle={{ justifyContent: "space-between" }}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                    />
                </Form>
            </App>
        </>
    )
}