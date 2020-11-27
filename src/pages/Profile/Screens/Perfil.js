import React, { useEffect, useState, useContext } from 'react'
import InputAnimated from '../../../components/InputAnimated'
import { Form, Row } from '../style'
import AnimatedDropDown from '../../../components/AnimatedDropDown'
import UserContext from '../../../contexs/User'
import axios from 'axios'

export default props => {
  const { propriedade, setPropriedade, setValidation, activePage, pages, setPages } = props
  const { user } = useContext(UserContext)
  const [federacoes, setFederacoes] = useState([])

  useEffect(() => {
    setValidation(false)
    GetFederacoes()
  }, [])

  useEffect(() => {
    String(propriedade.cep).length >= 9 && ViaCep()
  }, [propriedade.cep])

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

  const GetFederacoes = async () => {
    let list = []
    const { data } = await axios.get('https://dev.renovetecnologia.org/webrunstudio/WS_FEDERACOES.rule?sys=SIS', { headers: { authorization: user.token } })
    data.map(resp => list.push({ label: resp.sigla, value: resp.id_uf }))
    setFederacoes(list)
  }

  const ViaCep = async () => {
    const { data } = await axios(`https://viacep.com.br/ws/${propriedade.cep.replace('-', '')}/json/`)
    !data.erro && propriedade.id_propriedade === undefined && setPropriedade({
      ...propriedade,
      complemento: data.complemento,
      logradouro: data.logradouro,
      bairro: data.bairro,
      municipio: data.localidade,
      uf: federacoes.filter(resp => resp.label == data.uf).map(({ value }) => value)[0]
    })
  }

  return (
    <Form>
      {/* <InputAnimated
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
          maxLength={9}
          keyboardType="numeric"
          onChangeText={text => setPropriedade({ ...propriedade, cep: text.replace(/(\d{5})(\d{3})/g, '$1-$2') })}
          value={propriedade.cep}
          width="30.8%"
        />
        <AnimatedDropDown
          defaultValue={propriedade.uf}
          placeholder="UF"
          listOptions={federacoes}
          onChangeItem={response => setPropriedade({ ...propriedade, uf: response })}
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
      </Row> */}
    </Form>
  )
}
