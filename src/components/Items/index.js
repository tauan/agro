import React, { useEffect, useRef } from 'react'
import { Animated } from "react-native";

import { Container, ContainerIMG, IMGItem, Title, Button, TextButton } from './style'

export default (props) => {
    const { id, image, title } = props.item
    const { onPress, deleteFunction } = props

    const anim = useRef(new Animated.Value(0)).current
    const dlay = 100 * id

    useEffect(() => {
        Animated.sequence([
            Animated.spring(anim, {
                toValue: 1,
                friction: 8,
                delay: dlay,
                useNativeDriver: true,
            }),
        ]).start()
    }, [])

    return (
        <Container as={Animated.View} style={{ transform: [{ scale: anim }] }}>
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