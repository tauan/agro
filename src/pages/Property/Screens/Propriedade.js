import React, { useEffect, useState } from 'react'
import InputAnimated from '../../../components/InputAnimated'
import { Form, Row } from '../style'
import AnimatedDropDown from '../../../components/AnimatedDropDown'

export default props => {
  const { propriedade, setPropriedade, setValidation, activePage, pages, setPages } = props

  useEffect(() => {
    setValidation(false)
  }, [])

  useEffect(() => { validateForm() }, [
    propriedade.cep,
    propriedade.ccir,
    propriedade.endereco,
    propriedade.condicoes_posse,
    propriedade.cidade,
    propriedade.uf,
    propriedade.area,
    propriedade.nome_propriedade
  ])

  const validateForm = () => {
    const validations = [propriedade]

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

  const CondicoesPosse = () => {
    let list = []
    const condicoes = [
      'ARRENDATÁRIO(A)',
      'ASSENTADO(A) PELO PNRA',
      'BENEFICIÁRIO',
      'EXTRATIVISTA',
      'MEEIRO(A)',
      'PERMISSIONÁRIO DE ÁREAS PÚBLICAS',
      'POSSEIRO(A)',
      'PROPRIETÁRIO(A)',
      'USO COLETIVO',
      'OUTRA']
    condicoes.map(item => list.push({ label: item, value: item }))
    return list
  }

  return (
    <Form>
      <InputAnimated
        placeholder='Nome da propriedade'
        onChangeText={text => setPropriedade({ ...propriedade, descricao: text })}
        value={propriedade.descricao}
      />
      <Row>
        <InputAnimated
          placeholder='CCIR'
          onChangeText={text => setPropriedade({ ...propriedade, ccir: text })}
          value={propriedade.ccir}
          width="48%"
        />
        <InputAnimated
          keyboardType="numeric"
          placeholder='Área(ha)'
          onChangeText={text => setPropriedade({ ...propriedade, area: text })}
          value={propriedade.area}
          width="48%"
        />
        <AnimatedDropDown
          defaultValue={propriedade.condicoes_posse}
          placeholder="Condições de posse"
          listOptions={CondicoesPosse()}
          onChangeItem={response => setPropriedade({ ...propriedade, condicoes_posse: response })}
          width="100%"
        />
        <InputAnimated
          placeholder='CEP'
          onChangeText={text => setPropriedade({ ...propriedade, cep: text })}
          value={propriedade.cep}
          width="30.8%"
        />
        <InputAnimated
          placeholder='UF'
          onChangeText={text => setPropriedade({ ...propriedade, uf: text })}
          value={propriedade.uf}
          width="30.8%"
        />
        <InputAnimated
          placeholder='Nº'
          onChangeText={text => setPropriedade({ ...propriedade, n_logradouro: text })}
          value={propriedade.n_logradouro}
          width="30.8%"
        />
        <InputAnimated
          placeholder='Endereço'
          onChangeText={text => setPropriedade({ ...propriedade, logradouro: text })}
          value={propriedade.logradouro}
          width="100%"
        />
        <InputAnimated
          placeholder='Bairro'
          onChangeText={text => setPropriedade({ ...propriedade, bairro: text })}
          value={propriedade.bairro}
          width="100%"
        />
        <InputAnimated
          placeholder='Cidade'
          onChangeText={text => setPropriedade({ ...propriedade, municipio: text })}
          value={propriedade.municipio}
          width="100%"
        />
      </Row>
    </Form>
  )
}
