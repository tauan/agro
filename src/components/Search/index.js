import React from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { Container, Input } from './style'

export default (props) => {
    const {
        value = '',
        onChangeText = () => { }
    } = props
    return (
        <Container>
            <Icon name="search" size={25} color="#BDBDBD" style={{ position: 'absolute', top: 12, left: 8 }} />
            <Input value={value} onChangeText={onChangeText} />
        </Container>
    )
}