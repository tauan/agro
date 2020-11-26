import React, {useEffect} from 'react'
import InputAnimated from '../../../components/InputAnimated'
import {Form, Row} from '../style'

export default props => {
  const {produto, setProduto, setValidation, pages, activePage, setPages, setSplash} = props

  useEffect(() => {
    setSplash(false)

    let tempPages = pages
    tempPages[activePage.index].validated = true
    setPages(tempPages)
    setValidation(true)
    
    return () => setSplash(true)
  }, [])


  const validateForm = () => {
    const validations = []
    validations.push(produto.observacao)
  
    const validForm = validations.reduce((t,a) => t && a )
    let tempPages = pages
     
    if(validForm) {
      tempPages[activePage.index].validated = true
      setValidation(true)
      setPages(tempPages)
    }else {
      tempPages[activePage.index].validated = false
      setValidation(false)
    }
  }

  return(
    <Form>
        <InputAnimated
        textAlignVertical='top'
        placeholder='Descrição'
        onChangeText={text => setProduto({ ...produto, observacao: text })}
        value={`${produto.observacao}`}
        multiline={true}
        height={100}
        width="100%"
      />
    </Form>
  )
}