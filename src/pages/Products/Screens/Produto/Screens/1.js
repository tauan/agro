import React from 'react'
import {View} from 'react-native'
import Primary from '../../../../../components/Buttons/Primary'
import InputAnimated from '../../../../../components/InputAnimated'
import Dropdown from '../../../../../components/Dropdown'
import {Form} from '../style'

export default props => {
  const {produto, setActivePage, activePage} = props
  return(
    <Form>
      <InputAnimated
          placeholder='Produto'
          onChangeText={text => setProduto({...produto, categoria: text})}
          value={produto.categoria}
          width="100%"
      />
      <Dropdown
        placeholder="Gluten"
        listOptions={['Sim', 'Não']} />
      <InputAnimated
          placeholder='Descrição do produto'
          onChangeText={text => setProduto({...produto, descricao_produto: text})}
          value={produto.descricao_produto}
          width="100%"
      />
      <InputAnimated
          placeholder='Descrição do produto'
          onChangeText={text => setProduto({...produto, descricao_produto: text})}
          value={produto.descricao_produto}
          width="100%"
      />
      <InputAnimated
          placeholder='Descrição do produto'
          onChangeText={text => setProduto({...produto, descricao_produto: text})}
          value={produto.descricao_produto}
          width="100%"
      />
      <InputAnimated
          placeholder='Descrição do produto'
          onChangeText={text => setProduto({...produto, descricao_produto: text})}
          value={produto.descricao_produto}
          width="100%"
      />
      <Dropdown
        placeholder="Gluten"
        listOptions={['Sim', 'Não']} />
      <InputAnimated
          placeholder='Descrição do produto'
          onChangeText={text => setProduto({...produto, descricao_produto: text})}
          value={produto.descricao_produto}
          width="100%"
      />
      <InputAnimated
          placeholder='Descrição do produto'
          onChangeText={text => setProduto({...produto, descricao_produto: text})}
          value={produto.descricao_produto}
          width="100%"
      />
      <InputAnimated
          placeholder='Descrição do produto'
          onChangeText={text => setProduto({...produto, descricao_produto: text})}
          value={produto.descricao_produto}
          width="100%"
      />
      <InputAnimated
          placeholder='Descrição do produto'
          onChangeText={text => setProduto({...produto, descricao_produto: text})}
          value={produto.descricao_produto}
          width="100%"
      />
      <InputAnimated
          placeholder='Descrição do produto'
          onChangeText={text => setProduto({...produto, descricao_produto: text})}
          value={produto.descricao_produto}
          width="100%"
      />
      <Primary width="100%" title='Enviar' shadow={2} onPress={()=>setActivePage(activePage + 1)} />
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