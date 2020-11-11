import React from 'react'
import Dropdown from '../../../components/Dropdown'
import {Form, Row} from '../style'

export default props => {
  const {propriedades, setPropriedades} = props
  return(
    <Form style={{paddingBottom: 300}}>
        <Dropdown
          placeholder="Selecione a propriedade"
          listOptions={['Propriedade1', 'Propriedade2', 'Propriedade3']} 
          onChangeItem={({value}) => setPropriedades(value)}
          width="100%"
        />
    </Form>
  )
}