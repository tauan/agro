import React, { useEffect, useRef } from 'react'
import { Animated } from "react-native";

import { Container, ContainerIMG, IMGItem, Title, Button, TextButton } from './style'

export default (props) => {
    const { id, foto, descricao } = props.item
    const { onPress, deleteFunction, index, url } = props

    const anim = useRef(new Animated.Value(0)).current
    let dlay = 0
    if(index < 10) dlay = 200 * index 

    useEffect(() => {
        Animated.sequence([
            Animated.spring(anim, {
                toValue: 1,
                friction: 6,
                delay: dlay,
                useNativeDriver: true,
            }),
        ]).start()
    }, [])

    return (
        <Container as={Animated.View} style={{ transform: [{ scale: anim }] }}>
            <ContainerIMG onPress={onPress}>
                <IMGItem source={{ uri: foto ? foto : url}} />
            </ContainerIMG>
            <Title color="#33333">{descricao}</Title>
            <Button onPress={() => deleteFunction(id)}>
                <TextButton>Deletar</TextButton>
            </Button>
        </Container>
    )
}