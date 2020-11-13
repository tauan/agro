import React, { useEffect, useState } from 'react'
import InputAnimated from '../../../components/InputAnimated'
import { Form, Row } from '../style'
import axios from 'axios'
import AnimatedDropDown from '../../../components/AnimatedDropDown'
import Icon from 'react-native-vector-icons/Ionicons';

export default props => {
  const { produto, setProduto, user } = props
  const [listCategoria, setListCategoria] = useState([])
  const [unidadeMedida, setUnidadeMedida] = useState([])
  const [productList, setProductList] = useState([])
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    getCategorias()
    getUnidadeMedida()
    getProdutoBase()
  }, [])

  const getCategorias = () => {
    axios.get('http://dev.renovetecnologia.org:8049/webrunstudio/WS_CATEGORIAS.rule?sys=SIS', { headers: { authorization: user.token } })
      .then(async resp => {
        const list = await resp.data
          .map(item => {
            return { label: item.descricao, value: item.id_categoria}
          })
        setListCategoria(list)
      })

  }
  const getProdutoBase = async id => {
    const { data } = await axios.get('http://dev.renovetecnologia.org:8049/webrunstudio/WS_PRODUTOS_BASE.rule?sys=SIS', { headers: { authorization: user.token } })
    const list = []
    data.filter(categoria => categoria.id_categoria === id || categoria.id_categoria == produto.id_categoria).map(item => {
      list.push({ label: item.descricao, value: item.id_produto_base, url: item.url,  })
    })
    setProductList(list)
  }

  const getUnidadeMedida = () => {
    axios.get('http://dev.renovetecnologia.org:8049/webrunstudio/WS_UNID_MEDIDA.rule?sys=SIS', { headers: { authorization: user.token } })
      .then(async resp => {
        const list = await resp.data.map(item => {
          console.log('unidade: ', resp.data[0].id_unidade )
          return {
            label: item.descricao,
            value: item.id_unidade,
          }
        })
        setUnidadeMedida(list)
      })
  }
  console.log(produto)
  return (
    <Form>
      {/* categoria */}
      <AnimatedDropDown
        disabled={produto.id_produto != undefined ? true : false}
        defaultValue={listCategoria.filter(item => item.value == produto.id_categoria).map(item => item.value)[0]}
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
        defaultValue={productList.filter(item => item.value == produto.id_produto_base).map(item => item.value)[0]}
        placeholder="Produto base"
        listOptions={productList}
        onChangeItem={response => {
          setProduto({ ...produto, id_produto_base: response, foto: `${productList.filter(item => item.value === response).map(item => item.url)}` });
        }}
        width="100%"
      />
      <Row>
        <AnimatedDropDown
          defaultValue={produto.gluten}
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
          defaultValue={unidadeMedida.filter(item => item.value == produto.unidade_medida_1).map(item => item.value)[0]}
          placeholder="Unidade de medida"
          listOptions={unidadeMedida}
          onChangeItem={response => {
            setProduto({ ...produto, glutem: response });
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
