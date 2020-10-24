import React, { useLayoutEffect } from 'react'
import { Animated } from "react-native";

import { Container, ContainerIMG, IMGItem, Title, Button, TextButton } from './style'

export default (props) => {
    const { id, image, title } = props.item
    const { onPress, deleteFunction } = props

    const anim = new Animated.Value(0)
    const delay = (400 + id * 100)

    useLayoutEffect(() => {
        Animated.sequence([
            Animated.delay(delay),
            Animated.spring(anim, {
                toValue: 1,
                friction: 8,
                useNativeDriver: true,
            }),
        ]).start()
    }, [])

    return (
        <Container as={Animated.View} style={{  transform: [{ scale: anim }] }}>
            <ContainerIMG onPress={onPress}>
                <IMGItem source={{ uri: image }} />
            </ContainerIMG>
            <Title color="#33333">{title}</Title>
            <Button onPress={() => deleteFunction(id)}>
                <TextButton>Deletar</TextButton>
            </Button>
        </Container>
    )
}