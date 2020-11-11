import React, { useEffect } from 'react'
import {View} from 'react-native'
import InputDate from '../../../components/InputDate'
import InputAnimated from '../../../components/InputAnimated'
import Dropdown from '../../../components/Dropdown'
import {Form, Row} from '../style'

export default props => {
  const {producao, setProducao} = props
  //useEffect(()=>{ console.log({...producao, inicio_safra: "01/02/2000" }) },[])
  return(
    <Form>
      <Row>
        <InputDate value={producao.inicio_safra} placeholder="Inicio da safra" width="48%" onChangeDate={text => setProducao({ ...producao, inicio_safra: text })} />
        <InputDate value={producao.termino_safra} placeholder="Termino da safra" width="48%" onChangeDate={text => setProducao({ ...producao, termino_safra: text })} />
      </Row>
      <InputAnimated
        placeholder='Produção'
        onChangeText={text => setProducao({ ...producao, producao: text })}
        value={producao.producao}
        width="100%"
      />
      <Row>
        
        <InputAnimated
        placeholder='Peso'
        onChangeText={text => setProducao({ ...producao, qtde_producao: text })}
        value={producao.qtde_producao}
        width="48%"
        keyboardType="numeric"
      />
      <Dropdown
          placeholder="Unidade de medida"
          listOptions={['Toneladas', 'Quilos', 'Gramas']} 
          onChangeItem={({value}) => setProducao({...producao, unidade_medida_producao: value})}
          width="48%"
        />
      </Row>
    </Form>
  )
}