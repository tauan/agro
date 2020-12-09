import React, { useEffect, useState } from 'react'
import InputAnimated from '../../../components/InputAnimated'
import InputDate from '../../../components/InputDate'
import axios from 'axios'
import { Form, Row } from '../style'
import AnimatedDropDown from '../../../components/AnimatedDropDown'
import moment from 'moment'

export default props => {
  const { etiquetas, setEtiquetas, setValidation, activePage, pages, setPages, user } = props
  const [produtos, setProdutos] = useState([])
  const [propriedades, setPropriedades] = useState([])
  const [id_produto, setIDProduto] = useState()
  const [qtdPage, setQtdPage] = useState('')

  useEffect(() => {
    setValidation(false)
    GetProducts()
  }, [])

  useEffect(() => { validateForm() }, [
    etiquetas.id_produto,
    etiquetas.emissao,
    etiquetas.validade,
    etiquetas.modelo,
    etiquetas.lote,
    etiquetas.quantidade,
  ])

  useEffect(() => {
    etiquetas.id_produto != undefined && SetValidDate()
    GetPropriedades()
  }, [etiquetas.id_produto])

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
    axios.get(`https://dev.renovetecnologia.org/webrunstudio/WS_PRODUTOS.rule?sys=SIS&JSON=%7B%20%22id_agricultor%22%3A%20${user.id_agricultor}%20%7D`, { headers: { authorization: user.token } })
      .then(({ data }) => {
        data.map(item => list.push({ label: item.descricao, value: item.id_produto, dias_validade: item.dias_validade, propriedades: item.propriedades }))
      })
    setProdutos(list)
  }

  const GetPropriedades = () => {
    let list = []
    produtos.filter(({ value }) => value === id_produto).map(({ propriedades }) => propriedades.map(value => list.push({ label: value.descricao, value: value.id_propriedade })))[0]
    setPropriedades(list)
  }

  const TagModels = () => {
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

  const LimitCopy = (value) => {
    const newValue = parseInt(value) > 10 ? 10 : parseInt(value)
    if (newValue > 0 && etiquetas.modelo === 'PADRAO 35 X 35MM') {
      setEtiquetas({ ...etiquetas, quantidade: 48 * newValue })
    }
    if (newValue > 0 && etiquetas.modelo === 'PADRAO 50 X 50MM' || etiquetas.modelo === 'PADRAO 50 X 50MM - CÓDIGO DE BARRAS') {
      setEtiquetas({ ...etiquetas, quantidade: 24 * newValue })
    }
    if (newValue > 0 && etiquetas.modelo === 'PADRAO 100 X 50MM' || etiquetas.modelo === 'PADRAO 100 X 50MM - CÓDIGO DE BARRAS') {
      setEtiquetas({ ...etiquetas, quantidade: 12 * newValue })
    }
    if (newValue > 0 && etiquetas.modelo === 'PADRAO 100 X 100MM' || etiquetas.modelo === 'PADRAO 100 X 100MM - CÓDIGO DE BARRAS') {
      setEtiquetas({ ...etiquetas, quantidade: 6 * newValue })
    }
  }

  const SetValidDate = () => {
    const validade = produtos.filter(({ value }) => value === id_produto).map(({ dias_validade }) => dias_validade)[0]
    const data = etiquetas.emissao.split('/').map(resp => parseInt(resp)).reverse()
    if (etiquetas.emissao) {
      setEtiquetas({
        ...etiquetas,
        emissao: moment(data, 'YYYYMMDD').format('DD/MM/YYYY'),
        validade: moment(data, 'YYYYMMDD').add(validade, 'days').format('DD/MM/YYYY'),
        descricao: produtos.filter(({ value }) => value === id_produto).map(({ label }) => label)[0]
      })
    }
  }
  console.log(etiquetas)

  return (
    <Form>
      <AnimatedDropDown
        controll={true}
        defaultValue={etiquetas.id_produto}
        placeholder={"Selecionar produto"}
        listOptions={produtos}
        onChangeItem={response => {
          setIDProduto(response)
          setEtiquetas({
            ...etiquetas,
            id_produto: response,
            emissao: moment().format('DD/MM/YYYY'),
          })
        }}
        width="100%"
      />
      <Row>
        <InputDate
          disabled={!etiquetas.id_produto ? true : false}
          value={etiquetas.emissao}
          completeDate={true}
          placeholder="Data de embalagem"
          width="48%"
          onChangeDate={text => {
            setEtiquetas({
              ...etiquetas,
              emissao: text,
            });
          }} />
        <InputDate value={etiquetas.validade}
          disabled={!etiquetas.id_produto ? true : false}
          completeDate={true}
          placeholder="Data de validade"
          width="48%"
          onChangeDate={text =>
            setEtiquetas({ ...etiquetas, validade: text })
          } />
        <AnimatedDropDown
          disabled={!etiquetas.id_produto ? true : false}
          controll={true}
          defaultValue={etiquetas.modelo}
          placeholder={"Selecionar modelo de etiqueta"}
          listOptions={TagModels()}
          onChangeItem={response => setEtiquetas({ ...etiquetas, modelo: response })}
          width="100%"
        />
        <AnimatedDropDown
          disabled={!etiquetas.id_produto ? true : false}
          controll={true}
          defaultValue={etiquetas.id_propriedade}
          placeholder={"Selecionar propriedade"}
          listOptions={propriedades}
          onChangeItem={response => {
            setIDProduto(response)
            setEtiquetas({
              ...etiquetas,
              id_propriedade: response
            })
          }}
          width="100%"
        />
        <InputAnimated
          keyboardType="numeric"
          editable={etiquetas.id_produto ? true : false}
          maxLength={13}
          placeholder='Lote'
          onChangeText={text => setEtiquetas({ ...etiquetas, lote: text.replace(/[^0-9]/g, '') })}
          value={etiquetas.lote}
          width="48%"
        />
        <InputAnimated
          editable={etiquetas.modelo && etiquetas.id_produto ? true : false}
          maxLength={2}
          keyboardType="numeric"
          placeholder='Nº páginas (Máx. 10p)'
          onChangeText={text => {
            setQtdPage(parseInt(text.replace(/[^0-9]/g, '')) > 10 ? '10' : text);
            LimitCopy(text);
          }}
          value={qtdPage}
          width="48%"
        />
      </Row>
    </Form>
  )
}
