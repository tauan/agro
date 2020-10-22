import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { Container, ContainerIMG, IMGItem, Title, Button, TextButton } from './style'



export default (props) => {
    const {
        descricao_produto = 'Manga Rosa',
        foto_produto = 'https://nordesterural.com.br/wp-content/uploads/2019/01/manga-rosa-225x300.jpg'
    } = props

    const [load, setLoad] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setLoad(true)
        }, 2000);
    })

    return (
        <Container >
            <ContainerIMG onPress={() => { }}>
                {foto_produto ? <IMGItem source={{ uri: foto_produto }} /> : <ActivityIndicator size={50} color="#FFFFFF" />}
            </ContainerIMG>
            {descricao_produto &&
                <>
                    <Title color="#33333" >{descricao_produto}</Title>
                    <Button>
                        <TextButton>Delete</TextButton>
                    </Button>
                </>
            }
        </Container>
    )
}