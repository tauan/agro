import React, { useEffect, useState, useRef } from 'react'
import { Animated } from "react-native";

import { Modal, Container, ContainerMSG, Title, Button, TextButton } from './style'

export default (props, { children }) => {
    const { onPress } = props
    const [visible, setVisible] = useState(true)

    const anim = useRef(new Animated.Value(0)).current

    const ActiveModal = () => {
        setVisible(true)
        Animated.sequence([
            Animated.spring(anim, {
                toValue: 1,
                friction: 8,
                delay: 600,
                useNativeDriver: true,
            }),
        ]).start()
    }

    const desactiveModal = () => {
        Animated.sequence([
            Animated.spring(anim, {
                toValue: 0,
                friction: 8,
                delay: 400,
                useNativeDriver: true,
            }),
        ]).start()
        setTimeout(function () { setVisible(false); onPress(); }, 800)
    }

    useEffect(() => {
        ActiveModal()
    }, [])

    return (
        <Modal visible={visible}>
            <Container>
                <ContainerMSG as={Animated.View} style={{ transform: [{ scale: anim }] }}>
                    {children}
                    <Button onPress={() => desactiveModal()}>
                        <TextButton>Cancelar</TextButton>
                    </Button>
                </ContainerMSG>
            </Container>
        </Modal>
    )
}