import React, { useState } from 'react'
import { FlatList } from 'react-native'
import Primary from '../../components/Buttons/Primary'
import Header from '../../components/Header'
import Items from '../../components/Items'
import Search from '../../components/Search'

import { App, Form, Title1, Paragraph2 } from '../style'
import { Container, HeaderTitle } from './style'

export default ({ navigation }) => {
    const [value, setValue] = useState(undefined)
    return (
        <>
            <Header title="Produtos" navigation={navigation} />
            <App>
                <Form style={{ flex: 1 }}>
                    <Container>
                        <HeaderTitle>
                            <Title1>Produtos</Title1>
                            <Paragraph2>Cadastrar, editar e excluir produtos</Paragraph2>
                        </HeaderTitle>
                        <Primary title="Cadastrar produto" width={150} />
                    </Container>
                    <Search value={value} onChangeText={text => setValue(text)} />
                    <FlatList
                        data={[1, 2, 3, 4, 5, 6]}
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