import React, { useState, useEffect } from 'react'
import AnimatedDropDown from '../../../components/AnimatedDropDown'
import {Form, Row, ItemContainer, ItemText, DeleteButton, ContainerList, Subtitle} from '../style'
import Primary from '../../../components/Buttons/PrimaryTouchable'
import Icon from 'react-native-vector-icons/MaterialIcons'
import axios from 'axios'

export default props => {
  const {propriedades, setPropriedades, produto, setProduto, user} = props
  const [tempProperty, setTempProperty] = useState('')
  const [propriedadesList, setPropriedadesList] = useState([]) // lista com 2 atributos "label: descrição do produto" e "value: id_propriedade"
  const [propertiesList, setPropertiesList] = useState([]) // lista com todos os atributos que será usada para cruzar os dados e puxar a descrição de propriedades
  const [showList, setShowList] = useState([])
  const [update, setUpdate] = useState(false)

  useEffect(()=> { getPropertiesList() }, [])

  useEffect(()=> { listSelectedsProperties() }, [propertiesList, propriedades])

  const addNewProperty = async () => {
    const { id_agricultor, id_produto } = produto

    if(showList.length > 0) {
      const response = await showList.filter(item => item.id_propriedade === tempProperty)
      if(response.length > 0) return
    }

    if(tempProperty !== "") {
      propriedades.length > 0 ? setPropriedades([...propriedades, {id_agricultor, id_produto, id_propriedade: tempProperty}]) : setPropriedades([{id_agricultor, id_produto, id_propriedade: tempProperty}])
    }
  }

  const listSelectedsProperties = async () => {
    if(propriedades.length > 0) {
      const newList = await propriedades
      .map(item => {
        propertiesList.forEach(obj => { if(obj.id_propriedade === item.id_propriedade)  item.descricao = obj.descricao })
        return item
      })

      setShowList(newList)
    }else {
      setShowList([])
    }
  }

  const getPropertiesList = () => {
    axios.get(`http://dev.renovetecnologia.org:8049/webrunstudio/WS_PROPRIEDADE.rule?sys=SIS&JSON=%7B%20%22id_agricultor%22%3A%20${produto.id_agricultor}%20%7D`, { headers: { authorization: user.token } })
      .then(async resp => {
        const list = await resp.data.map(item => ({ label: item.descricao, value: item.id_propriedade }))

        setPropertiesList(resp.data) // Guarda a lista original para cruzar informações na hora de exibir a lista
        setPropriedadesList(list) // Guarda uma lista contendo objetos com dois atributos "label: descrição do produto" e "value: id_propriedade"
      })
  }

  const deleteProperty = async idPropriedade => {
    if(propriedades.length === 0) return
    const list = await propriedades.filter(item => item.id_propriedade !== idPropriedade)
    setPropriedades(list)
  }

  return(
    <Form style={{paddingBottom: 300}}>
      <Row>
        <AnimatedDropDown
            placeholder="Adicione uma propriedade"
            listOptions={propriedadesList} 
            width="80%"
            onChangeItem={(item)=> setTempProperty(item)}
          />
        <Primary width="18%" title='+' shadow={2} onPress={() => addNewProperty()} />
      </Row>
      <ContainerList>
        {showList.length === 0 && <Subtitle>Nenhum item para ser exibido </Subtitle>}
        {showList.length > 0 && showList.map((item, index) => (
            <ItemContainer key={index}>
              <ItemText>{item.descricao}</ItemText>
              <DeleteButton onPress={() => deleteProperty(item.id_propriedade) }>
                <Icon style={{ padding: 10 }} name="delete" color="#666666" size={20} />
              </DeleteButton>
            </ItemContainer>
          ))
        }
      </ContainerList>
        
    </Form>
  )
}