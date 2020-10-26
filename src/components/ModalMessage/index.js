import React, { useEffect, useState, useRef } from 'react'
import { Animated } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { Modal, Container, BoxMessage, Button, TextButton } from './style'
//import Primary from '../Buttons/Primary'
import { Title1, Text2 } from '../../pages/style'

export default (props) => {
    const {
        onPress,
        children,
        showMessage = {
            icon: false,
            title: '',
            message: '',
            type: '',
        }
    } = props

    const [visible, setVisible] = useState(true)
    const [config, setConfig] = useState({})

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
        console.log(children)
        switch (showMessage.type) {
            case 'alert':
                setConfig({
                    color: '#FEBA02',
                    icon: 'alert-outline'
                })
                break;

            default:
                break;
        }
        ActiveModal()
    }, [])

    const ChildrenMessage = () => {
        return (
            <>
                {showMessage.icon && <MaterialCommunityIcons size={70} name={config.icon} color={config.color} />}
                <Title1 style={{ color: config.color, marginBottom: 10 }}>{showMessage.title}</Title1>
                <Text2>{showMessage.message}</Text2>
                {/* <Primary title="Deletar" backgroundColor="#EB4D4D" width="100%" onPress={() => console.log(user)} /> */}
                <Button onPress={() => desactiveModal()}>
                    <TextButton>Cancelar</TextButton>
                </Button>
            </>
        )
    }

    return (
        <Modal visible={visible}>
            <Container>
                <BoxMessage as={Animated.View} style={{ transform: [{ scale: anim }], padding: 0 }}>
                    {children ? (
                        <>
                            {children}
                            <Button Button
                                style={{
                                    backgroundColor: 'transparent',
                                    position: 'absolute',
                                    top: 15,
                                    right: 15,
                                    padding: 5,
                                    paddingTop: 0
                                }}
                                onPress={(evt) => { desactiveModal(); console.log(evt) }}>
                                <MaterialCommunityIcons size={20} name='close' color='#fff' />
                            </Button>
                        </>) : ChildrenMessage()}
                </BoxMessage>
            </Container>
        </Modal >
    )
}