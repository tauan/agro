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

  useEffect(() => {
    getCategorias()
    getUnidadeMedida()
  }, [])

  const getCategorias = () => {
    axios.get('http://dev.renovetecnologia.org:8049/webrunstudio/WS_CATEGORIAS.rule?sys=SIS', { headers: { authorization: user.token } })
      .then(async resp => {
        const list = await resp.data.map(item => {
          return { label: item.descricao, value: item.id_categoria }
        })
        setListCategoria(list)
      })

  }

  const getProdutoBase = id => {
    axios.get('http://dev.renovetecnologia.org:8049/webrunstudio/WS_PRODUTOS_BASE.rule?sys=SIS', { headers: { authorization: user.token } })
      .then(async resp => {
        const { data } = resp

        const list = []
        await data.map(item => {
          if (item.id_categoria == id) {
            list.push({ label: item.descricao, value: item.id_produto_base, url: item.url })
          }
          return
        })
        setProductList(list)
      })
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
        placeholder="Categoria"
        listOptions={listCategoria}
        onChangeItem={response => {
          setProduto({ ...produto, id_categoria: response });
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
          getProdutoBase(response)
        }}
        width="100%"
      />
      <Row>
        <AnimatedDropDown
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
