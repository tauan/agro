import React, {useContext} from 'react'
import { FlatList } from 'react-native'
import Primary from '../../components/Buttons/Primary'
import Header from '../../components/Header'
import Items from '../../components/Items'
import UserContext from '../../contexs/User'

import { App, Form, Title1, Paragraph2 } from '../style'
import { Container, HeaderTitle } from './style'
const lista = [
    {id: 123456, image: "https://raw.githubusercontent.com/tauan/agro/dev/src/components/Items/images.jpg", title: "Abacate"}, 
    {id: 123123, image: "https://d26lpennugtm8s.cloudfront.net/stores/746/397/products/laranja_ceu1-53852a66aa8037bd7415221636647098-1024-1024.jpg", title: "Laranja"},  
    {id: 232111, image: "https://static3.tcdn.com.br/img/img_prod/350075/muda_de_uva_sem_sementes_1m_feita_de_enxerto_6043_1_20190521161351.jpg", title: "Uva"}, 
]
export default ({ navigation }) => {
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