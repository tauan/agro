import React, { useEffect, useState } from 'react'
import InputDate from '../../../components/InputDate'
import InputAnimated from '../../../components/InputAnimated'
import AnimatedDropDown from '../../../components/AnimatedDropDown'
import {Form, Row} from '../style'
import axios from 'axios'

export default props => {
  const {produto,setProduto, user, setValidation, activePage, pages, setPages} = props
  const [tipoProducao, setTipoProducao] = useState([])
  const [unidadeMedida, setUnidadeMedida] = useState([])

  useEffect(()=>{
    setValidation(false)
    getTipoProducao()
    getUnidadeMedida()
  },[])

  useEffect(() => { validateForm() }, [
    produto.mes_inicial_plantio, 
    produto.mes_final_plantio, 
    produto.tipo_producao, 
    produto.unidade_medida_2, 
    produto.quantidade_producao, 
  ])

  const validateForm = () => {
    const validations = []
    validations.push(produto.mes_inicial_plantio)
    validations.push(produto.mes_final_plantio)
    validations.push(produto.tipo_producao)
    validations.push(produto.unidade_medida_2)
    validations.push(produto.quantidade_producao)
  
    const validForm = validations.reduce((t,a) => t && a )
    let tempPages = pages
     
    if(validForm) {
      tempPages[activePage.index].validated = true
      setValidation(true)
      setPages(tempPages)
    }else {
      tempPages[activePage.index].validated = false
      setValidation(false)
    }
  }

  const getTipoProducao = async () => {
    const tempTiposProducao = ["DIARIA", "SEMANAL", "QUINZENAL", "MENSAL", "SEMESTRAL", "ANUAL"]
    const tiposProducao = await tempTiposProducao.map(item => ({ label: item, value: item }))
    //console.log(tiposProducao)
    setTipoProducao(tiposProducao) 
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
        <InputDate value={produto.mes_inicial_plantio} placeholder="Inicio da safra" width="48%" onChangeDate={text => setProduto({ ...produto, mes_inicial_plantio : text }) } />
        <InputDate value={produto.mes_final_plantio} placeholder="Termino da safra" width="48%" onChangeDate={text => setProduto({ ...produto, mes_final_plantio: text })} />
      
        <AnimatedDropDown
          placeholder="Tipo de produção"
          listOptions={tipoProducao} 
          onChangeItem={value => setProduto({...produto, tipo_producao: value})}
          width="100%"
        />
        <AnimatedDropDown
            placeholder="Unidade de medida"
            listOptions={unidadeMedida} 
            onChangeItem={response => {
              setProduto({...produto, unidade_medida_2: response }); 
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