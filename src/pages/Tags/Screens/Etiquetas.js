import React, { useEffect, useState } from 'react'
import InputAnimated from '../../../components/InputAnimated'
import InputDate from '../../../components/InputDate'
import axios from 'axios'
import { Form, Row } from '../style'
import AnimatedDropDown from '../../../components/AnimatedDropDown'

export default props => {
  const { etiquetas, setEtiquetas, setValidation, activePage, pages, setPages, user } = props
  const [produtos, setProdutos] = useState([])
  const [diasvalidade, setDiasValidade] = useState([])

  useEffect(() => {
    setValidation(false)
    GetProducts()
  }, [])

  useEffect(() => { validateForm() }, [
    etiquetas.cep,
    etiquetas.ccir,
    etiquetas.endereco,
    etiquetas.condicoes_posse,
    etiquetas.cidade,
    etiquetas.uf,
    etiquetas.area,
    etiquetas.nome_propriedade
  ])

  const validateForm = () => {
    const validations = [etiquetas]

    const validForm = validations.reduce((t, a) => t && a)

    let tempPages = pages
    if (validForm) {
      tempPages[activePage.index].validated = true
      setValidation(true)
      setPages(tempPages)
    } else {
      tempPages[activePage.index].validated = false
      setValidation(false)
    }
  }

  const GetProducts = () => {
    const list = []
    axios.get(`http://dev.renovetecnologia.org:8049/webrunstudio/WS_PRODUTOS.rule?sys=SIS&JSON=%7B%20%22id_agricultor%22%3A%20${user.id_agricultor}%20%7D`, { headers: { authorization: user.token } })
      .then(( {data} ) => {
        data.map(item => list.push({ label: item.descricao, value: item.id_produto, dias_validade: item.dias_validade }))
        console.log(data)
      })
    setProdutos(list)
  }

  const TagsModel = () => {
    const list = []
    const models = [
      'PADRAO 35 X 35MM',
      'PADRAO 50 X 50MM',
      'PADRAO 100 X 50MM',
      'PADRAO 100 X 100MM',
      'PADRAO 50 X 50MM - CÓDIGO DE BARRAS',
      'PADRAO 100 X 50MM - CÓDIGO DE BARRAS',
      'PADRAO 100 X 100MM - CÓDIGO DE BARRAS'
    ]
    models.map(item => list.push({ label: item, value: item }))
    return list
  }

  return (
    <Form>
      <AnimatedDropDown
        controll={true}
        defaultValue={etiquetas.id_produto}
        placeholder={"Produtos"}
        listOptions={produtos}
        onChangeItem={response => setEtiquetas({ ...etiquetas, id_produto: response })}
        width="100%"
      />
      <Row>
        <InputDate value={etiquetas.emissao} completeDate={true} placeholder="Data de embalagem" width="48%" onChangeDate={text => setEtiquetas({ ...etiquetas, emissao: text })} />
        <InputDate value={etiquetas.validade} completeDate={true} placeholder="Data de validade" width="48%" onChangeDate={text => setEtiquetas({ ...etiquetas, validade: `${text + 1}` })} />
        <AnimatedDropDown
          controll={true}
          defaultValue={etiquetas.modelo}
          placeholder={"Modelo de Etiqueta"}
          listOptions={TagsModel()}
          onChangeItem={response => setEtiquetas({ ...etiquetas, modelo: response })}
          width="100%"
        />
        <InputAnimated
          maxLength={13}
          placeholder='Lote'
          onChangeText={text => setEtiquetas({ ...etiquetas, lote: text })}
          value={etiquetas.lote}
          width="48%"
        />
        <InputAnimated
          maxLength={3}
          keyboardType="numeric"
          placeholder='Quantidade'
          onChangeText={text => setEtiquetas({ ...etiquetas, quantidade: text })}
          value={etiquetas.quantidade}
          width="48%"
        />
      </Row>
    </Form>
  )
}
