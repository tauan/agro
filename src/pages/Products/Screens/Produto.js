import React, { useEffect, useState } from 'react'
import InputAnimated from '../../../components/InputAnimated'
import { Form, Row } from '../style'
import axios from 'axios'
import AnimatedDropDown from '../../../components/AnimatedDropDown'

export default props => {
  const { produto, setProduto, user, setValidation } = props
  const [listCategoria, setListCategoria] = useState([])
  const [unidadeMedida, setUnidadeMedida] = useState([])
  const [productList, setProductList] = useState([])
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    setValidation(false)
    getCategorias()
    getUnidadeMedida()
  }, [])

  useEffect(() => {
    validateForm()
  }, [produto.id_categoria, produto.id_produto_base, produto.dias_validade ])

  const validateForm = () => {
    const validations = []
    validations.push(produto.id_categoria)
    validations.push(produto.id_produto_base)
    validations.push(produto.dias_validade)
    validations.push(produto.unidade_medida_1)
    validations.push(produto.peso_liquido)
    validations.push(produto.peso_bruto)
    validations.push(produto.codigo_barras)
  
    const validForm = validations.reduce((t,a) => t && a )
    validForm ? setValidation(true) : setValidation(false)
  }

  const getCategorias = () => {
    axios.get('http://dev.renovetecnologia.org:8049/webrunstudio/WS_CATEGORIAS.rule?sys=SIS', { headers: { authorization: user.token } })
      .then(async resp => {
        const list = await resp.data.map(item => {
          return { label: item.descricao, value: item.id_categoria }
        })
        setListCategoria(list)
      })

  }

  const getProdutoBase = async id => {
    const { data } = await axios.get('http://dev.renovetecnologia.org:8049/webrunstudio/WS_PRODUTOS_BASE.rule?sys=SIS', { headers: { authorization: user.token } })
    const list = []
    data.filter(categoria => categoria.id_categoria === id).map(item => {
      list.push({ label: item.descricao, value: item.id_produto_base, url: item.url })
    })
    setProductList(list)
  }

  const getUnidadeMedida = () => {
    axios.get('http://dev.renovetecnologia.org:8049/webrunstudio/WS_UNID_MEDIDA.rule?sys=SIS', { headers: { authorization: user.token } })
      .then(async resp => {
        const list = await resp.data.map(item => {
          return { label: item.descricao, value: item.id_unidade }
        })
        setUnidadeMedida(list)
      })
  }

  return (
    <Form>
      {/* categoria */}
      <AnimatedDropDown
        controll={true}
        placeholder={listCategoria[0] !== undefined ? listCategoria.map(item => {
          if(item.value === produto.id_categoria)  return (item.label) 
        }) : ""}
        listOptions={listCategoria}
        onChangeItem={response => {
          setProductList([])
          response === 365 ? setDisabled(true) : setDisabled(false)
          setProduto({ ...produto, id_categoria: response, id_produto_base: undefined });
          getProdutoBase(response)
        }}
        width="100%"
      />
      {/* produto */}
      <AnimatedDropDown
        placeholder="Produto base"
        listOptions={productList}
        onChangeItem={response => {
          setProduto({ ...produto, id_produto_base: response, foto: `${productList.filter(item => item.value === response).map(item => item.url)}` });
        }}
        width="100%"
      />
      <Row>
        <AnimatedDropDown
          disabled={disabled}
          placeholder="Glutem"
          listOptions={[{ label: "Sim", value: "Sim" }, { label: "Não", value: "Não" }]}
          onChangeItem={response => {
            setProduto({ ...produto, glutem: response });
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
