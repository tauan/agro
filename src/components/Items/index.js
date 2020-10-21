import React, { useEffect, useState } from 'react'

import Link from '../../components/Buttons/Link'
import { Title4 } from '../style'
import { Container } from './style'

export default ({ navigation }) => {
    const {
        data = [],
        navigation,
    } = navigation
    return (
        <Container>
            <Title4>Produtos</Title4>
            <Link />
        </Container>
    )
}