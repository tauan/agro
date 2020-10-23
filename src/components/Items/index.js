import React, { useEffect } from 'react'
import { Animated } from "react-native";

import { Container, ContainerIMG, IMGItem, Title, Button, TextButton } from './style'

export default (props) => {
    const { id, image, title } = props.item
    const { onPress, deleteFunction } = props

    const fade = new Animated.Value(0);

    useEffect(() => {
        Animated.timing(fade, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start()
    }, [])

    return (
        <Container as={Animated.View} style={{ opacity: fade }}>
            <ContainerIMG onPress={onPress}>
                <IMGItem source={{ uri: image }} />
            </ContainerIMG>
            <Title color="#33333">{title}</Title>
            <Button onPress={() => deleteFunction(id)}>
                <TextButton>Delete</TextButton>
            </Button>
        </Container>
    )
}