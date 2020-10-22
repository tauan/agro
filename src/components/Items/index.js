import React from 'react'
import { Container, ContainerIMG, IMGItem, Title, Button, TextButton } from './style'

export default (props) => {
    const {id, image, title} = props.item
    const {onPress, deleteFunction} = props
    return (
        <Container>
            <ContainerIMG onPress={onPress}>
                <IMGItem source={{uri: image}} />
            </ContainerIMG>
            <Title color="#33333">{title}</Title>
            <Button onPress={()=> deleteFunction(id)}>
                <TextButton>Delete</TextButton>
            </Button>
        </Container>
    )
}