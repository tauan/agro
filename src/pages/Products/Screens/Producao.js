import React, { useEffect, useState } from 'react'
import InputDate from '../../../components/InputDate'
import InputAnimated from '../../../components/InputAnimated'
import Dropdown from '../../../components/Dropdown'
import AnimatedDropDown from '../../../components/AnimatedDropDown'
import {Form, Row} from '../style'
import axios from 'axios'

export default props => {
  useEffect(()=>{
    getTipoProducao()
    getUnidadeMedida()
  },[])
  const {produto,setProduto, user} = props
  const [tipoProducao, setTipoProducao] = useState([])
  const [unidadeMedida, setUnidadeMedida] = useState([])

  const getTipoProducao = () => {
    console.log("criar rota de tipo de producao")
  }
  const getUnidadeMedida = () => {
    axios.get('http://dev.renovetecnologia.org:8049/webrunstudio/WS_UNID_MEDIDA.rule?sys=SIS', { headers : { authorization: user.token }})
    .then(async resp => {
      const list = await resp.data.map(item => {
        return { label: item.descricao, value: item.id_unidade } 
      })
      setUnidadeMedida(list)
    })
  }

  return(
    <Form>
      <Row>
        <InputDate value={produto.mes_inicial_plantio} placeholder="Inicio da safra" width="48%" onChangeDate={text => setProduto({ ...produto, mes_inicial_plantio : text })} />
        <InputDate value={produto.mes_final_plantio} placeholder="Termino da safra" width="48%" onChangeDate={text => setProduto({ ...produto, mes_final_plantio: text })} />
      
        <Dropdown
          placeholder="Tipo de produção"
          listOptions={tipoProducao} 
          onChangeItem={value => setProduto({...produto, tipo_producao: value})}
          width="100%"
        />
        <AnimatedDropDown
            placeholder="Unidade de medida"
            listOptions={unidadeMedida} 
            onChangeItem={response => {
              setProduto({...produto, glutem: response }); 
            }}
            width="100%"
          />
          <InputAnimated
            placeholder='Quantidade de produção'
            onChangeText={text => setProduto({ ...produto, quantidade_producao: text })}
            value={`${produto.quantidade_producao}`}
            width="100%"
            keyboardType="numeric"
          />
      </Row>
    </Form>
  )
}