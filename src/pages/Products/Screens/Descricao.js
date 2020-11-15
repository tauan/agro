import React from 'react'
import InputAnimated from '../../../components/InputAnimated'
import {Form, Row} from '../style'

export default props => {
  const {produto, setProduto} = props
  return(
    <Form>
        <InputAnimated
        textAlignVertical='top'
        placeholder='Descrição'
        onChangeText={text => setProduto({ ...produto, observacao: text })}
        value={`${produto.observacao}`}
        multiline={true}
        height={100}
        width="100%"
      />
    </Form>
  )
}