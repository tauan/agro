import React, { useEffect, useState } from 'react'
import InputAnimated from '../../../components/InputAnimated'
import { Form, Row } from '../style'
import axios from 'axios'
import AnimatedDropDown from '../../../components/AnimatedDropDown'

export default props => {
  const { produto, setProduto, user, setValidation, activePage, pages, setPages } = props
  const [listCategoria, setListCategoria] = useState([])
  const [unidadeMedida, setUnidadeMedida] = useState([])
  const [productList, setProductList] = useState([])
  const [disabled, setDisabled] = useState(false)
  const [defaultValue, setDefaultValue] = useState()

  useEffect(() => {
    setValidation(false)
    getCategorias()
    getUnidadeMedida()
    getProdutoBase()
  }, [])

  useEffect(() => { validateForm() }, [
    produto.id_categoria,
    produto.id_produto_base,
    produto.dias_validade,
    produto.unidade_medida_1,
    produto.peso_liquido,
    produto.peso_bruto,
    produto.codigo_barras
  ])

  const validateForm = () => {
    const validations = []
    validations.push(produto)
    validations.push(produto.id_categoria)
    validations.push(produto.id_produto_base)
    validations.push(produto.dias_validade)
    validations.push(produto.unidade_medida_1)
    validations.push(produto.peso_liquido)
    validations.push(produto.peso_bruto)
    validations.push(produto.codigo_barras)

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

  const getCategorias = () => {
    axios.get('http://dev.renovetecnologia.org:8049/webrunstudio/WS_CATEGORIAS.rule?sys=SIS', { headers: { authorization: user.token } })
      .then(async resp => {
        const list = await resp.data
          .map(item => {
            return { label: item.descricao, value: item.id_categoria }
          })
        setListCategoria(list)
      })

  }
  const getProdutoBase = async id => {
    const { data } = await axios.get('http://dev.renovetecnologia.org:8049/webrunstudio/WS_PRODUTOS_BASE.rule?sys=SIS', { headers: { authorization: user.token } })
    const list = []
    data.filter(categoria => categoria.id_categoria === id || categoria.id_categoria == produto.id_categoria).map(item => {
      list.push({ label: item.descricao, value: item.id_produto_base, url: item.url, })
    })
    setProductList(list)
  }

  const getUnidadeMedida = () => {
    axios.get('http://dev.renovetecnologia.org:8049/webrunstudio/WS_UNID_MEDIDA.rule?sys=SIS', { headers: { authorization: user.token } })
      .then(async resp => {
        const list = await resp.data.map(item => {
          return {
            label: item.descricao,
            value: item.id_unidade,
          }
        })
        setUnidadeMedida(list)
      })
  }
  return (
    <Form>
      {/* categoria */}
      <AnimatedDropDown
        controll={true}
        disabled={produto.id_produto != undefined ? true : false}
        defaultValue={produto.id_categoria}
        // defaultValue={''}
        placeholder={"Categoria"}
        listOptions={listCategoria}
        onChangeItem={response => {
          response === 365 ? setDisabled(true) : setDisabled(false)
          setProduto({ ...produto, id_categoria: response, id_produto_base: undefined });
          getProdutoBase(response)
        }}
        width="100%"
      />
      {/* produto */}
      <AnimatedDropDown
        disabled={produto.id_produto != undefined ? true : false}
        defaultValue={produto.id_produto_base}
        placeholder="Produto base"
        listOptions={productList}
        onChangeItem={response => {
          setProduto({ ...produto, id_produto_base: response, foto: `${productList.filter(item => item.value === response).map(item => item.url)}` });
        }}
        width="100%"
      />
      <Row>
        <AnimatedDropDown
          // defaultValue={produto.gluten}
          disabled={disabled}
          placeholder="Glutem"
          listOptions={[{
            label: "Sim",
            value: "Sim",
          },
          {
            label: "Não",
            value: "Não",
          }]}
          onChangeItem={response => {
            setProduto({ ...produto, gluten: response });
          }}
          width="48%"
        />
        <InputAnimated
          placeholder='Dias de validade'
          onChangeText={text => setProduto({ ...produto, dias_validade: text })}
          value={`${produto.dias_validade}`}
          width="48%"
          keyboardType="numeric"
        />
        <AnimatedDropDown
          defaultValue={produto.unidade_medida_1}
          placeholder="Unidade de medida"
          listOptions={unidadeMedida}
          defaultValue={produto.unidade_medida_1}
          onChangeItem={response => {
            setProduto({ ...produto, unidade_medida_1: response });
          }}
        />
        <InputAnimated
          placeholder='Peso liquido'
          onChangeText={text => setProduto({ ...produto, peso_liquido: text })}
          value={`${produto.peso_liquido}`}
          width="48%"
          keyboardType="numeric"
        />
        <InputAnimated
          placeholder='Peso bruto'
          onChangeText={text => setProduto({ ...produto, peso_bruto: text })}
          value={`${produto.peso_bruto}`}
          width="48%"
          keyboardType="numeric"
        />
        <InputAnimated
          placeholder='Codigo de barras'
          onChangeText={text => setProduto({ ...produto, codigo_barras: text })}
          value={`${produto.codigo_barras}`}
          width="100%"
          keyboardType="numeric"
        />
      </Row>
    </Form>
  )
}
