import React, {useEffect, useState} from 'react'
import InputAnimated from '../../../components/InputAnimated'
import Dropdown from '../../../components/Dropdown'
import {Form, Row} from '../style'
import axios from 'axios'
import AnimatedDropDown from '../../../components/AnimatedDropDown'
import Icon from 'react-native-vector-icons/Ionicons';

export default props => {
  const {produto,setProduto} = props
  const [listCategoria, setListCategoria] = useState([])
  useEffect(()=>{
    axios.get('https://dev.renovetecnologia.org/webrunstudio/WS_PRODUTOS_BASE.rule?sys=SIS').then(resp => {
      const list = resp.data.map(item => {  return item.descricao })
      setProductList(list)
    })
    axios.get("http://dev.renovetecnologia.org:8049/webrunstudio/WS_CATEGORIAS.rule?sys=SIS")
    .then(({data}) => Array.isArray(data) ? setListCategoria(data): setListCategoria([data]))
  },[])
  const [productList, setProductList] = useState([' '])
  return(
    <Form>
      <AnimatedDropDown list={listCategoria} />
      <Dropdown
        placeholder="Categoria"
        listOptions={['categoria 1', 'categoria 2']}
        defaltValue={{
          label: produto.descricao_produto, value: produto.descricao_produto, icon: () => {}
        }}
        onChangeItem={({value}) => setProduto({...produto, categoria: value})} />
      <Dropdown
        placeholder="Produto"
        listOptions={productList}
        defaltValue={{
          label: produto.categoria, value: produto.categoria, icon: () => {}
        }}
        onChangeItem={({value}) => setProduto({...produto, categoria: value})} />
      <Row>
        <Dropdown
          placeholder="Gluten"
          listOptions={['Sim', 'Não']} 
          onChangeItem={({value}) => setProduto({...produto, gluten: value})}
          width="48%"
          />
        <Dropdown
          placeholder="Unidade de medida"
          listOptions={['Quilo', 'Grama']} 
          onChangeItem={({value}) => setProduto({...produto, unid_medida_produto: value})}
          width="48%"
        />
        <InputAnimated
          placeholder='Peso liquido'
          onChangeText={text => setProduto({...produto, peso_liquido: text})}
          value={produto.peso_liquido}
          width="100%"
          keyboardType="numeric"
        />
        <InputAnimated
          placeholder='Peso bruto'
          onChangeText={text => setProduto({...produto, peso_bruto: text})}
          value={produto.peso_bruto}
          width="100%"
          keyboardType="numeric"
        />
        <InputAnimated
          placeholder='Dias de validade'
          onChangeText={text => setProduto({...produto, dias_validade: text})}
          value={produto.dias_validade}
          width="100%"
          keyboardType="numeric"
        />
        <InputAnimated
          placeholder='Codigo de barras'
          onChangeText={text => setProduto({...produto, cod_barras: text})}
          value={produto.cod_barras}
          width="100%"
          keyboardType="numeric"
        />
        
      </Row>
      
    </Form>
  )
}

{/* 
              categoria: "",
              descricao_produto: "",
              gluten: "",
              unid_medida_produto: "",
              peso_liquido: "",
              peso_bruto: "",
              cod_barras: "",
              dias_validade: "",
              foto_produto: "",
            */}