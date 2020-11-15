import React, { useState, useEffect } from 'react'
import AnimatedDropDown from '../../../components/AnimatedDropDown'
import {Form, Row, ItemContainer, ItemText, DeleteButton, ContainerList, Subtitle} from '../style'
import Primary from '../../../components/Buttons/PrimaryTouchable'
import Icon from 'react-native-vector-icons/MaterialIcons'
import axios from 'axios'

export default props => {
  const {propriedades, setPropriedades, produto, setProduto, user} = props
  const [tempPropriedade, setTempPropriedade] = useState('')
  const [propriedadesList, setPropriedadesList] = useState([])

  useEffect(()=> {
    getPropertiesList()
  }, [])

  const getPropertiesList = () => {
    axios.get(`http://dev.renovetecnologia.org:8049/webrunstudio/WS_PROPRIEDADE.rule?sys=SIS&JSON=%7B%20%22id_agricultor%22%3A%20${produto.id_agricultor}%20%7D`, { headers: { authorization: user.token } })
      .then(async resp => {
        const list = await resp.data
          .map(item => {
            return { label: item.descricao, value: item.id_propriedade }
          })
        setPropriedadesList(list)
        propriedades.map(item => console.log(item))
      })
  }
  // id_agricultor, id_produto, id_propriedade
  return(
    <Form style={{paddingBottom: 300}}>
      <Row>
      <AnimatedDropDown
          placeholder="Selecione a propriedade"
          listOptions={propriedadesList} 
          width="80%"
        />
      <Primary width="18%" title='+' shadow={2} onPress={() => { tempPropriedade !== "" ? (setPropriedadesList([...propriedadesList, tempPropriedade]), setTempPropriedade("")) : "" }} />
      </Row>
      <ContainerList>
        {propriedades.length === 0 && <Subtitle>Nenhum item para ser exibido </Subtitle>}
        {propriedades.length > 0 && propriedades.map((item, index) => {
          return propriedadesList.map(propriedade => { 
            if(propriedade.value === item.id_propriedade) {
              (
                <ItemContainer key={index}>
                  <ItemText>{item.id_agricultor}</ItemText>
                  <DeleteButton>
                    <Icon style={{ padding: 10 }} name="delete" color="#666666" size={20} onPress={() => { console.log(item) }} />
                  </DeleteButton>
                </ItemContainer>
              )
            }
            propriedade.value === item.id_propriedade ? (
              <ItemContainer key={index}>
                <ItemText>{item.id_agricultor}</ItemText>
                <DeleteButton>
                  <Icon style={{ padding: 10 }} name="delete" color="#666666" size={20} onPress={() => { console.log(item) }} />
                </DeleteButton>
              </ItemContainer>
            ) : ""          
           })
          
          })
        }
      </ContainerList>
        
    </Form>
  )
}