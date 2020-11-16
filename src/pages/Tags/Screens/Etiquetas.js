import React, { useEffect, useState } from 'react'
import InputAnimated from '../../../components/InputAnimated'
import { Form, Row } from '../style'
import AnimatedDropDown from '../../../components/AnimatedDropDown'

export default props => {
  const { etiquetas, setEtiquetas, setValidation, activePage, pages, setPages } = props

  useEffect(() => {
    setValidation(false)
  }, [])

  useEffect(() => { validateForm() }, [
    etiquetas.cep,
    etiquetas.ccir,
    etiquetas.endereco,
    etiquetas.condicoes_posse,
    etiquetas.cidade,
    etiquetas.uf,
    etiquetas.area,
    etiquetas.nome_propriedade
  ])

  const validateForm = () => {
    const validations = [etiquetas]

    const validForm = validations.reduce((t, a) => t && a)

    let tempPages = pages
    if (validForm) {
      tempPages[activePage.index].validated = true
      setValidation(true)
      setPages(tempPages)
    } else {
      tempPages[activePage.index].validated = false
      setValidation(false)
    }
  }

  return (
    <Form>
      <AnimatedDropDown
        controll={true}
        defaultValue={etiquetas.id_produto}
        placeholder={"Produtos"}
        listOptions={['']}
        onChangeItem={response => {
          setetiquetas({ ...etiquetas, id_produto: response });
          getetiquetasBase(response)
        }}
        width="100%"
      />
      <Row>
        <InputAnimated
          placeholder='Data de Embalagem'
          onChangeText={text => setEtiquetas({ ...etiquetas, emissao: text })}
          value={etiquetas.emissao}
          width="48%"
        />
        <InputAnimated
          placeholder='Data de Validade'
          onChangeText={text => setEtiquetas({ ...etiquetas, validade: text })}
          value={etiquetas.validade}
          width="48%"
        />
        <AnimatedDropDown
          controll={true}
          defaultValue={etiquetas.modelo}
          placeholder={"Modelo de Etiqueta"}
          listOptions={['']}
          onChangeItem={response => {
            setetiquetas({ ...etiquetas, modelo: response });
            getetiquetasBase(response)
          }}
          width="100%"
        />
        <InputAnimated
          placeholder='Lote'
          onChangeText={text => setEtiquetas({ ...etiquetas, lote: text })}
          value={etiquetas.lote}
          width="48%"
        />
        <InputAnimated
          placeholder='Quantidade'
          onChangeText={text => setEtiquetas({ ...etiquetas, quantidade: text })}
          value={etiquetas.quantidade}
          width="48%"
        />
      </Row>
    </Form>
  )
}
