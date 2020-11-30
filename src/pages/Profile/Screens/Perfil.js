import React, { useEffect, useState, useContext } from 'react'
import InputAnimated from '../../../components/InputAnimated'
import InputDate from '../../../components/InputDate'
import { Form, Row } from '../style'
import AnimatedDropDown from '../../../components/AnimatedDropDown'
import axios from 'axios'
import moment from 'moment'

export default props => {
  const { profile, user, setProfile, setValidation, activePage, pages, setPages } = props
  const [federacoes, setFederacoes] = useState([])

  useEffect(() => {
    setValidation(false)
    GetFederacoes()
  }, [])

  useEffect(() => {
    String(profile.cep).length >= 9 && ViaCep()
  }, [profile.cep])

  useEffect(() => { validateForm() }, [
    profile.cep,
    profile.ccir,
    profile.endereco,
    profile.condicoes_posse,
    profile.cidade,
    profile.uf,
    profile.area,
  ])

  const validateForm = () => {
    const validations = [profile]

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

  const Sexo = () => {
    let list = []
    const condicoes = [
      'MASCULINO',
      'FEMININO']
    condicoes.map((item, index) => list.push({ label: item, value: index + 1 }))
    return list
  }

  const GetFederacoes = async () => {
    let list = []
    const { data } = await axios.get('https://dev.renovetecnologia.org/webrunstudio/WS_FEDERACOES.rule?sys=SIS', { headers: { authorization: user.token } })
    data.map(resp => list.push({ label: resp.sigla, value: resp.id_uf }))
    setFederacoes(list)
  }

  const ViaCep = async () => {
    try {
      const cep = profile.cep_propriedade.replace('-', '')
      const { data } = await axios.get(`http://cep.republicavirtual.com.br/web_cep.php?cep=${cep}&formato=jsonp`)
      setProfile({
        ...profile,
        complemento: data.complemento,
        logradouro_propriedade: data.logradouro,
        bairro_propriedade: data.bairro,
        municipio: data.cidade,
        id_uf: federacoes.filter(resp => resp.label == data.uf).map(({ value }) => value)[0]
      })
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <Form>
      <InputAnimated
        placeholder='Nome'
        onChangeText={text => setProfile({ ...profile, nome: text })}
        value={profile.nome}
      />
      <Row>
        <InputAnimated
          keyboardType="numeric"
          editable={false}
          placeholder='CPF/CNPJ'
          onChangeText={text => setProfile({ ...profile, cpf: text.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4') })}
          value={profile.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4')}
          width="48%"
        />
        <InputAnimated
          keyboardType="numeric"
          placeholder='RG'
          onChangeText={text => setProfile({ ...profile, rg: text })}
          value={profile.rg}
          width="48%"
        />
        <InputDate value={profile.data_nascimento}
          completeDate={true}
          placeholder="Data de nascimento"
          width="48%"
          onChangeDate={text =>
            setProfile({ ...profile, data_nascimento: text })
          } />
        <AnimatedDropDown
          defaultValue={profile.id_sexo}
          placeholder="Sexo"
          listOptions={Sexo()}
          onChangeItem={response => setProfile({ ...profile, id_sexo: response })}
          width="48%"
        />
        <InputAnimated
          keyboardType="numeric"
          placeholder='Reg. sanitário'
          onChangeText={text => setProfile({ ...profile, registro_sanitario: text })}
          value={profile.registro_sanitario}
          width="48%"
        />
        <InputAnimated
          keyboardType="numeric"
          placeholder='Insc. Estadual'
          onChangeText={text => setProfile({ ...profile, insc_estadual_prod: text })}
          value={profile.insc_estadual_prod}
          width="48%"
        />
        <InputAnimated
          keyboardType="numeric"
          placeholder='Insc. Ceasa'
          onChangeText={text => setProfile({ ...profile, insc_ceasa: text })}
          value={profile.insc_ceasa}
          width="48%"
        />
        <InputAnimated
          keyboardType="numeric"
          placeholder='M.A.P.A'
          onChangeText={text => setProfile({ ...profile, mapa: text })}
          value={profile.mapa}
          width="48%"
        />
        <InputAnimated
          maxLength={13}
          keyboardType="numeric"
          placeholder='Telefone'
          onChangeText={text => setProfile({ ...profile, telefone_1: text.replace(/(\d{2})(\d{4})(\d{4})/g, '($1) $2-$3') })}
          value={profile.telefone_1 ? profile.telefone_1.replace(/(\d{2})(\d{4})(\d{4})/g, '($1) $2-$3') : profile.telefone_3}
          width="48%"
        />
        <InputAnimated
          maxLength={14}
          keyboardType="numeric"
          placeholder='Celular'
          onChangeText={text => setProfile({ ...profile, telefone_2: text.replace(/(\d{2})(\d{5})(\d{4})/g, '($1) $2-$3') })}
          value={profile.telefone_2 ? profile.telefone_2.replace(/(\d{2})(\d{5})(\d{4})/g, '($1) $2-$3') : profile.telefone_3}
          width="48%"
        />
        <InputAnimated
          maxLength={14}
          keyboardType="numeric"
          placeholder='WhatsApp'
          onChangeText={text => setProfile({ ...profile, telefone_3: text.replace(/(\d{2})(\d{5})(\d{4})/g, '($1) $2-$3') })}
          value={profile.telefone_3 ? profile.telefone_3.replace(/(\d{2})(\d{5})(\d{4})/g, '($1) $2-$3') : profile.telefone_3}
          width="48%"
        />
        <InputAnimated
          placeholder='CEP'
          maxLength={9}
          keyboardType="numeric"
          onChangeText={text => setProfile({ ...profile, cep_propriedade: text.replace(/(\d{5})(\d{3})/g, '$1-$2') })}
          value={profile.cep_propriedade ? profile.cep_propriedade.replace(/(\d{5})(\d{3})/g, '$1-$2') : profile.cep_propriedade}
          width="48%"
        />
        <AnimatedDropDown
          defaultValue={profile.id_uf}
          placeholder="UF"
          listOptions={federacoes}
          onChangeItem={response => setProfile({ ...profile, uf: response })}
          width="48%"
        />
        <InputAnimated
          placeholder='Nº'
          onChangeText={text => setProfile({ ...profile, n_logradouro: text })}
          value={profile.n_logradouro}
          width="48%"
        />
        <InputAnimated
          placeholder='Endereço'
          onChangeText={text => setProfile({ ...profile, logradouro_propriedade: text })}
          value={profile.logradouro_propriedade}
          width="100%"
        />
        <InputAnimated
          placeholder='Bairro'
          onChangeText={text => setProfile({ ...profile, bairro_propriedade: text })}
          value={profile.bairro_propriedade}
          width="100%"
        />
        <InputAnimated
          placeholder='Cidade'
          onChangeText={text => setProfile({ ...profile, municipio: text })}
          value={profile.municipio}
          width="100%"
        />
      </Row>
    </Form>
  )
}
