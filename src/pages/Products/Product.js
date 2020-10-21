import React, { useState } from 'react'
import { FlatList } from 'react-native'
import Primary from '../../components/Buttons/Primary'
import Header from '../../components/Header'
import Items from '../../components/Items'

import { App, Form, Title } from '../style'

export default ({ navigation }) => {
    return (
        <>
            <Header title="Produtos" navigation={navigation} />
            <App>
                <Form>
                    <Title />
                    <Text />
                    <Primary />
                </Form>
                <Items />
                {/* <FlatList
                    data={[1, 2, 3, 4, 5, 6]}
                    renderItem={({ item }) => <Items data={items} />}
                    keyExtractor={(key, index) => String(index)}
                /> */}
            </App>
        </>
    )
}