import React, { useEffect, useState, useRef } from 'react'
import { Animated } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {
    Modal,
    Container,
    BoxMessage,
    Button,
    TextButton,
    DialogBox
} from './style'
import Primary from '../Buttons/Primary'
import { TitleStyle, TextStyle } from '../../pages/style'

export default (props) => {
    const {
        backgroundColor = "#008b54",
        title = '',
        visible,
        visiblePrimaryButton = true,
        visibleCancelButton = true,
        children,
        showMessage = {
            icon: false,
            title: '',
            message: '',
            type: '',
        }
    } = props

    const [config, setConfig] = useState({})

    const anim = useRef(new Animated.Value(0)).current

    const ActiveModal = () => {
        Animated.sequence([
            Animated.spring(anim, {
                toValue: 1,
                friction: 6,
                delay: 600,
                useNativeDriver: true,
            }),
        ]).start()
    }

    const DesactiveModal = () => {
        Animated.sequence([
            Animated.spring(anim, {
                toValue: 0,
                delay: 400,
                useNativeDriver: true,
            }),
        ]).start()
    }

    useEffect(() => {
        switch (showMessage.type) {
            case 'alert':
                setConfig({
                    color: '#FEBA02',
                    icon: 'alert-outline'
                })
                break;
            case 'success':
                setConfig({
                    color: '#008b54',
                    icon: 'check-circle-outline'
                })
                break;

            default:
                break;
        }
        ActiveModal()
    }, [])

    const ChildrenMessage = () => {
        return (
            <DialogBox>
                {showMessage.icon && <MaterialCommunityIcons size={70} name={config.icon} color={config.color} />}
                <TitleStyle color={config.color} >{showMessage.title}</TitleStyle>
                <TextStyle style={{ marginVertical: 15 }} align="center" color="#666" fontsize={20}>{showMessage.message}</TextStyle>
                {visiblePrimaryButton && <Primary title={title} backgroundColor={backgroundColor} width="100%" onPress={() => { DesactiveModal(); props.onPressPrimaryButton(false) }} />}
                {visibleCancelButton && <Button onPress={() => { DesactiveModal(); setTimeout(function () { props.onPressCancelButton(false) }, 800) }}>
                    <TextButton>Cancelar</TextButton>
                </Button>}
            </DialogBox>
        )
    }

    return (
        <Modal visible={visible}>
            <Container>
                <BoxMessage as={Animated.View} style={{ transform: [{ scale: anim }], padding: 0 }}>
                    {children ? children : ChildrenMessage()}
                </BoxMessage>
            </Container>
        </Modal >
    )
}