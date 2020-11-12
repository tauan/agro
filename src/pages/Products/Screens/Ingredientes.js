import React, { useState, useEffect } from 'react'
import InputAnimated from '../../../components/InputAnimated'
import Primary from '../../../components/Buttons/PrimaryTouchable'
import { Form, Row, ContainerList, Subtitle, ItemContainer, ItemText, DeleteButton } from '../style'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ModalMessage from '../../../components/ModalMessage'

export default props => {
  useEffect(() => { }, [ingredientes])
  const { ingredientes, setIngredientes } = props
  const [tempIngrediente, setTempIngrediente] = useState("")
  const [activeModal, setActiveModal] = useState(false)
  const [update, setUpdate] = useState(false)
  const [item, setItem] = useState(undefined)
  const deleteIngrediente = index => {
    const list = ingredientes
    list.splice(index, 1)
    setIngredientes(list)
    setUpdate(update ? false : true)
  }
  return (
    <Form>
      <Row>
        <InputAnimated
          placeholder='Adicionar ingrediente'
          onChangeText={text => setTempIngrediente(text)}
          value={tempIngrediente}
          width="80%"
        />
        <Primary width="18%" title='+' shadow={2} onPress={() => { tempIngrediente !== "" ? (setIngredientes([...ingredientes, tempIngrediente]), setTempIngrediente("")) : "" }} />
      </Row>
      <ContainerList>
        {ingredientes.length === 0 && <Subtitle>Nenhum item para ser exibido </Subtitle>}
        {ingredientes.length > 0 && ingredientes.map((item, index) => (
          <ItemContainer key={index}>
            <ItemText>{item}</ItemText>
            <DeleteButton>
              <Icon style={{padding: 10}} name="delete" color="#666666" size={20} onPress={() => { setItem({ item, index }); setActiveModal(true); }} />
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
          onPress={(value) => {
            deleteIngrediente(item.index);
            setTimeout(function () { setActiveModal(value); }, 800)
          }}
          onPressCancelButton={(value) => setTimeout(function () { setActiveModal(value); }, 800)}
          visible={activeModal} >
        </ModalMessage>}
    </Form >

  )
}