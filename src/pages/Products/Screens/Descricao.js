import React from 'react'
import InputAnimated from '../../../components/InputAnimated'
import {Form, Row} from '../style'

export default props => {
  const {descricao, setDescricao} = props
  return(
    <Form>
        <InputAnimated
        placeholder='Descrição'
        onChangeText={text => setDescricao(text)}
        value={descricao}
        multiline={true}
        height={70}
        width="100%"
      />
    </Form>
  )
}