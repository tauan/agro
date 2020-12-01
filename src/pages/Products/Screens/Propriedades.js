import React, { useState, useEffect } from 'react'
import AnimatedDropDown from '../../../components/AnimatedDropDown'
import {Form, Row, ItemContainer, ItemText, DeleteButton, ContainerList, Subtitle} from '../style'
import Primary from '../../../components/Buttons/PrimaryTouchable'
import Icon from 'react-native-vector-icons/MaterialIcons'
import axios from 'axios'

export default props => {
  const { propriedades, setPropriedades, produto, setProduto, user, setSplash, setValidation, pages, setPages, activePage} = props
  const [tempProperty, setTempProperty] = useState('')
  const [propriedadesList, setPropriedadesList] = useState([]) // lista com 2 atributos "label: descrição do produto" e "value: id_propriedade"
  const [propertiesList, setPropertiesList] = useState([]) // lista com todos os atributos que será usada para cruzar os dados e puxar a descrição de propriedades
  const [showList, setShowList] = useState([])
  const [update, setUpdate] = useState(false)
  const [activeModal, setActiveModal] = useState(false)

  useEffect(()=> { 
    setSplash(false)
    getPropertiesList()

    return () => setSplash(true)
   }, [])


  useEffect(() => {
    let tempPages = pages
    if(Array.isArray(produto.propriedades) && produto.propriedades.length > 0 ){
      tempPages[activePage.index].validated = true
      setValidation(true)
      setPages(tempPages)
    } else {
      tempPages[activePage.index].validated = false
      setValidation(false)
    }
  }, [produto.propriedades])

  useEffect(() => {
    if(tempProperty !== "")
      addNewProperty()
  }, [tempProperty])

  const addNewProperty = () => {
 //[{"descricao": "FAZENDA CANTO DO RIO", "id_propriedade": 5}, {"descricao": "FAZENDA FELIZ D'AGUA", "id_propriedade": 6}]

    if(tempProperty==="") return 
    if(produto.propriedades.length > 0) {
      const response = produto.propriedades.filter(item => item.id_propriedade === tempProperty)
      if(response.length > 0) return
    }
    let newProperty = {
      descricao: "",
      id_propriedade: undefined
    }
    propriedadesList.map(property => {
      if(property.value === tempProperty) 
      newProperty = {
        descricao: property.label,
        id_propriedade: property.value
      }
    })
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
    if(!Array.isArray(produto.propriedades)) return
    if(produto.propriedades.length === 0) return
    const list = await produto.propriedades.filter(item => item.id_propriedade !== idPropriedade)
  
    try{
      const options = {
          method: "DELETE",
          url: "https://dev.renovetecnologia.org/webrunstudio/WS_PRODUTO_PROPRIEDADE.rule?sys=SIS",
          headers: {
              authorization: user.token
          },
          data: {
              id_agricultor: produto.id_agricultor,
              id_produto: produto.id_produto,
              id_propriedade: idPropriedade
          }
      }
      await axios.request(options)
      setProduto({...produto, propriedades: list})
    } catch(err) {}

  }

  return(
    <Form style={{paddingBottom: 300}}>
      <Row>
        <AnimatedDropDown
            placeholder="Adicione uma propriedade"
            listOptions={propriedadesList} 
            width="100%"
            onChangeItem={(item)=> {
              setTempProperty(item)
            }}
          />
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
      { activeModal &&
       <ModalMessage
       showMessage={{
           title: 'Atenção!',
           message: `Deseja realmente deletar o produto ${item.item} da lista?`,
           type: 'alert',
           icon: true
       }}
       title="Deletar"
       onPressPrimaryButton={() => deleteIngrediente(item.index)}
       setActiveModal={setActiveModal} />}
    </Form>
  )
}