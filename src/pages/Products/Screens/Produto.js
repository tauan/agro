import React, { useEffect, useState } from 'react'
import InputAnimated from '../../../components/InputAnimated'
import { Form, Row } from '../style'
import axios from 'axios'
import AnimatedDropDown from '../../../components/AnimatedDropDown'

export default props => {
  const { produto, setProduto, user, setValidation, activePage, pages, setPages, setSplash } = props
  const [listCategoria, setListCategoria] = useState([])
  const [unidadeMedida, setUnidadeMedida] = useState([])
  const [productList, setProductList] = useState([])
  const [disabled, setDisabled] = useState(false)
  const [defaultValue, setDefaultValue] = useState()

  useEffect(() => { 
    checkProductId() 
    return () => setSplash(true)
  }, [])

  useEffect(()=>{
    if(produto.id_categoria)
      getProdutoBase(produto.id_categoria)
  },[produto.id_categoria])

  const checkProductId = () => { 
    setValidation(false)
    if(produto.id_produto_base){ 
      getProdutoBase(produto.id_produto_base)
    }
    getCategorias()
    getUnidadeMedida()
  }

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

  const getCategorias = async () => {
    try {
      const result = await axios.get('http://dev.renovetecnologia.org:8049/webrunstudio/WS_CATEGORIAS.rule?sys=SIS', { headers: { authorization: user.token } })
      if(result.data !== undefined && Array.isArray(result.data)){
        const list = await result.data.map(item => {
          return { label: item.descricao, value: parseInt(item.id_categoria) }
        })
        setListCategoria(list)
      }
    } catch (err) {
      getCategorias()
    }
  }

  const getProdutoBase = async id => {
    try {
      const { data } = await axios.get('http://dev.renovetecnologia.org:8049/webrunstudio/WS_PRODUTOS_BASE.rule?sys=SIS', { headers: { authorization: user.token } })
      const list = []
      if(data && Array.isArray(data)) 
        data.filter(categoria => categoria.id_categoria === id || categoria.id_categoria == produto.id_categoria).map(item => {
          list.push({ label: item.descricao, value: parseInt(item.id_produto_base), url: item.url, })
        })
      setProductList(list)
    }catch (err) {
      getProdutoBase(id)
    }
  }

  const getDescription = async id => {
    const description = await productList.filter(item => item.value === id)
    description.length === 1 ? setProduto({...produto, id_produto_base: id, descricao: description[0].label, url_imagem: description[0].url }) : console.log("O produto base selecionado é invalido.")
  }

  const getUnidadeMedida = async () => {
    try {
      const {data} = await axios.get('http://dev.renovetecnologia.org:8049/webrunstudio/WS_UNID_MEDIDA.rule?sys=SIS', { headers: { authorization: user.token } })
      const list = data.map(item => {
        return {
          label: item.descricao,
          value: item.id_unidade,
        }
      })
      setUnidadeMedida(list)
    } catch(err) {
      getUnidadeMedida()
    }
    setTimeout(()=> setSplash(false), 300)
  }
  return (
    <Form>
      {/* categoria */}
      <AnimatedDropDown
        disabled={produto.id_produto != undefined ? true : false}
        defaultValue={produto.id_categoria}
        placeholder={"Categoria"}
        listOptions={listCategoria}
        onChangeItem={response => {
          setProduto({ ...produto, id_categoria: response, id_produto_base: undefined });
          
        }}
        width="100%"
      />
      {/* produto */}
      <AnimatedDropDown
        disabled={produto.id_produto != undefined ? true : false}
        defaultValue={produto.id_produto_base}
        placeholder="Produto base"
        listOptions={productList}
        onChangeItem={response => getDescription(response)}
        width="100%"
      />
      <Row>
        <AnimatedDropDown
          disabled={produto.id_categoria === 365 ? true : false}
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
          placeholder="Unidade de medida"
          listOptions={unidadeMedida}
          defaultValue={produto.unidade_medida_1}
          onChangeItem={response => setProduto({ ...produto, unidade_medida_1: response })}
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
