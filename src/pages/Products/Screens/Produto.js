import React, {useEffect} from 'react'
import Primary from '../../../components/Buttons/Primary'
import InputAnimated from '../../../components/InputAnimated'
import Dropdown from '../../../components/Dropdown'
import {Form} from '../style'

export default props => {
  useEffect(()=> {console.log(props)}, [])
  const {produto,setProduto} = props
  return(
    <Form>
      <Dropdown
        placeholder="Categoria"
        listOptions={['opção 1', 'Opção 2']}
        defaltValue={{
          label: produto.categoria, value: produto.categoria, icon: () => {}
        }}
        onChangeItem={({value}) => setProduto({...produto, categoria: value})} />
      <InputAnimated
          placeholder='Descrição do produto'
          onChangeText={text => setProduto({...produto, descricao_produto: text})}
          value={produto.descricao_produto}
          width="100%"
      />
      <Dropdown
        placeholder="Gluten"
        listOptions={['Sim', 'Não']} 
        onChangeItem={({value}) => setProduto({...produto, gluten: value})}
        />
      <Dropdown
        placeholder="Unidade de medida"
        listOptions={['Quilo', 'Grama']} 
        onChangeItem={({value}) => setProduto({...produto, unid_medida_produto: value})}
        />
      
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