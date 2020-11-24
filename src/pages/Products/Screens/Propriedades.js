import React, { useState, useEffect } from 'react'
import AnimatedDropDown from '../../../components/AnimatedDropDown'
import {Form, Row, ItemContainer, ItemText, DeleteButton, ContainerList, Subtitle} from '../style'
import Primary from '../../../components/Buttons/PrimaryTouchable'
import Icon from 'react-native-vector-icons/MaterialIcons'
import axios from 'axios'

export default props => {
  const { propriedades, setPropriedades, produto, setProduto, user, setSplash} = props
  const [tempProperty, setTempProperty] = useState('')
  const [propriedadesList, setPropriedadesList] = useState([]) // lista com 2 atributos "label: descrição do produto" e "value: id_propriedade"
  const [propertiesList, setPropertiesList] = useState([]) // lista com todos os atributos que será usada para cruzar os dados e puxar a descrição de propriedades
  const [showList, setShowList] = useState([])
  const [update, setUpdate] = useState(false)

  useEffect(()=> { 
    setSplash(false)
    getPropertiesList()
    return () => setSplash(true)
   }, [])

  const addNewProperty = () => {
    if(produto.propriedades === undefined) {
    // setProduto({...produto, propriedades: [tempProperty]})
      return // caso seja undefined a função ja para aqui
    }
    if(tempProperty === "") return // caso não haja um tempProperty ou items na lista a função apra aqui
    const response = produto.propriedades.filter(item => item.id_propriedade === tempProperty)
    if(response.length > 0) return

    propriedadesList.map(item => {
      if(item.id_propriedade === tempProperty) 
        console.log(item)
      console.log("*******************")
    })
    console.log(propriedadesList)
    
    const newProperty = {
      descricao: "",
      id_propriedade: parseInt(tempProperty) 
    }

    if(produto.propriedades && Array.isArray(produto.propriedades)) setProduto({...produto, propriedades: [...produto.propriedades, newProperty]})
    
  }


  const getPropertiesList = () => {
    try {
      axios.get(`https://dev.renovetecnologia.org/webrunstudio/WS_PROPRIEDADE.rule?sys=SIS&JSON=%7B%20%22id_agricultor%22%3A%20${produto.id_agricultor}%20%7D`, { headers: { authorization: user.token } })
      .then(async resp => {
        const list = await resp.data.map(item => ({ label: item.descricao, value: item.id_propriedade }))

        setPropertiesList(resp.data) // Guarda a lista original para cruzar informações na hora de exibir a lista
        setPropriedadesList(list) // Guarda uma lista contendo objetos com dois atributos "label: descrição do produto" e "value: id_propriedade"
      })
    }catch(err) {
      console.log(err)
      getPropertiesList()
    }
    
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
        {produto.propriedades.length === 0 && <Subtitle>Nenhum item para ser exibido </Subtitle>}
        {produto.propriedades.length > 0 && produto.propriedades.map((item, index) => (
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