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
  const [id_produto, setIDProduto] = useState()
  const [validade, setValidade] = useState()
  const [qtdPage, setQtdPage] = useState()

  useEffect(() => {
    setValidation(false)
    GetProducts()
  }, [])

  useEffect(() => {
    LimitCopy()
  }, [etiquetas.modelo, qtdPage])

  useEffect(() => { validateForm() }, [
    etiquetas.id_produto,
    etiquetas.emissao,
    etiquetas.validade,
    etiquetas.modelo,
    etiquetas.lote,
    etiquetas.quantidade,
  ])

  useEffect(() => {
    etiquetas.emissao != '' && SetValidDate()
  }, [etiquetas.id_produto, etiquetas.emissao])

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
        data.map(item => list.push({ label: item.descricao, value: item.id_produto, dias_validade: item.dias_validade, descricao: item.descricao }))
      })
    setProdutos(list)
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

  const LimitCopy = () => {
    let pages = parseInt(qtdPage) > 10 ? 10 : parseInt(qtdPage)
    if (qtdPage != undefined && etiquetas.modelo === 'PADRAO 35 X 35MM') {
      setEtiquetas({ ...etiquetas, quantidade: 24 * parseInt(pages) })
    }
    if (qtdPage != undefined && etiquetas.modelo === 'PADRAO 50 X 50MM' || etiquetas.modelo === 'PADRAO 50 X 50MM - CÓDIGO DE BARRAS') {
      setEtiquetas({ ...etiquetas, quantidade: 12 * parseInt(pages) })
    }
    if (qtdPage != undefined && etiquetas.modelo === 'PADRAO 100 X 50MM' || etiquetas.modelo === 'PADRAO 100 X 50MM - CÓDIGO DE BARRAS') {
      setEtiquetas({ ...etiquetas, quantidade: 6 * parseInt(pages) })
    }
    if (qtdPage != undefined && etiquetas.modelo === 'PADRAO 100 X 100MM' || etiquetas.modelo === 'PADRAO 100 X 100MM - CÓDIGO DE BARRAS') {
      setEtiquetas({ ...etiquetas, quantidade: 6 * parseInt(pages) })
    }
  }


  const SetValidDate = (emissao) => {
    const validDays = produtos.filter(({ value }) => value === id_produto).map(({ dias_validade }) => dias_validade)[0]
    if (emissao) {
      const days = emissao.substring(0, 2) >= 10 ? emissao.substring(0, 2) : emissao.substring(0, 1)
      const month = days < 10 ? emissao.substring(2, 4) : emissao.substring(3, 5)
      const years = days < 10 ? emissao.substring(5, 9) : emissao.substring(6, 10)
      const d = [years, month, days]
      setValidade(d)
    }
    setEtiquetas({
      ...etiquetas,
      emissao: moment(validade).format('DD/MM/YYYY'),
      validade: moment(validade).add(validDays, 'days').format('DD/MM/YYYY'),
      descricao: produtos.filter(({ value }) => value === id_produto).map(({ descricao }) => descricao)[0]
    })
  }
  return (
    <Form>
      <AnimatedDropDown
        controll={true}
        defaultValue={etiquetas.id_produto}
        placeholder={"Produtos"}
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
            SetValidDate(text)
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
          placeholder={"Modelo de Etiqueta"}
          listOptions={TagModels()}
          onChangeItem={response => setEtiquetas({ ...etiquetas, modelo: response })}
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
          onChangeText={text => { setQtdPage(parseInt(text.replace(/[^0-9]/g, '')) > 10 ? '10' : text.replace(/[^0-9]/g, '')) }}
          value={qtdPage}
          width="48%"
        />
      </Row>
    </Form>
  )
}
