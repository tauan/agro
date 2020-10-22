import React from 'react'
import { Container, ContainerIMG, IMGItem, Title, Button, TextButton } from './style'

export default (props) => {
    return (
        <Container>
            <ContainerIMG onPress={() => { }}>
                <IMGItem />
            </ContainerIMG>
            <Title color="#33333">Produtos</Title>
            <Button>
                <TextButton>Delete</TextButton>
            </Button>
        </Container>
    )
}