import React, { useState, useEffect } from 'react'
import InputAnimated from '../../../components/InputAnimated'
import Primary from '../../../components/Buttons/PrimaryTouchable'
import { Form, Row, ContainerList, Subtitle, ItemContainer, ItemText, DeleteButton } from '../style'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ModalMessage from '../../../components/ModalMessage'

export default props => {
  const { produto, setProduto, ingredientes, setIngredientes, setSplash, pages, activePage, setPages, setValidation } = props
  const [tempIngrediente, setTempIngrediente] = useState("")
  const [activeModal, setActiveModal] = useState(false)
  const [update, setUpdate] = useState(false)
  const [item, setItem] = useState(undefined)

  useEffect(() => { 
    setSplash(false)

    let tempPages = pages
    tempPages[activePage.index].validated = true
    setValidation(true)
    setPages(tempPages)
    
    return () => setSplash(true)

  }, [])

  const deleteIngrediente = index => {
    const list = produto.in_natura
    list.splice(index, 1)
    setProduto({...produto, in_natura: list})
    setUpdate(update ? false : true)
  }

  const addItem = () => {
    if(Array.isArray(produto.in_natura)) {
      setProduto({...produto, in_natura:[...produto.in_natura, tempIngrediente]}) 
    }else {
      setProduto({...produto, in_natura:[tempIngrediente]}) 
    }
    setTempIngrediente("")
  }

  return (
    <Form>
      <Row>
        <InputAnimated
          editable={produto.id_categoria !== 365}
          placeholder='Adicionar ingrediente'
          onChangeText={text => setTempIngrediente(text)}
          value={tempIngrediente}
          width="80%"
        />
        <Primary width="18%" title='+' shadow={2} onPress={() => { tempIngrediente !== "" ? addItem() : "" }} />
      </Row>
      <ContainerList>
        {(!Array.isArray(produto.in_natura) || produto.in_natura.length === 0 ) && <Subtitle>Nenhum item para ser exibido </Subtitle>}
        {(Array.isArray(produto.in_natura) && produto.in_natura.length > 0) && produto.in_natura.map((item, index) => (
          <ItemContainer key={index}>
            <ItemText>{index+1} - {item}</ItemText>
            <DeleteButton>
              <Icon style={{ padding: 10 }} name="delete" color="#666666" size={20} onPress={() => { setItem({ item, index }); setActiveModal(true); }} />
            </DeleteButton>
          </ItemContainer>
        ))}
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
    </Form >

  )
}