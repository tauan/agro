import React, { useEffect, useState, useContext } from 'react'
import Geolocation from '@react-native-community/geolocation'
import InputAnimated from '../../../components/InputAnimated'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Form, Row, LocationButton } from '../style'
import AnimatedDropDown from '../../../components/AnimatedDropDown'
import UserContext from '../../../contexs/User'
import axios from 'axios'

export default props => {
  const { propriedade, setPropriedade, setValidation, activePage, pages, setPages } = props
  const { user } = useContext(UserContext)
  const [federacoes, setFederacoes] = useState([])
  const [longitude, setLongitude] = useState('')
  const [latitude, setLatitude] = useState('')

  useEffect(() => {
    setValidation(false)
    GetFederacoes()
  }, [])

  useEffect(() => {
    GetCEP()
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
      'ASSENTADO(A) DO INCRA',
      'BENEFICIÁRIO(A) DE PROGRAMA DE CRÉDITO FUNDIÁRIO',
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
    try {
      const { data } = await axios.get('https://dev.renovetecnologia.org/webrunstudio/WS_FEDERACOES.rule?sys=SIS', { headers: { authorization: user.token } })
      data.map(resp => list.push({ label: resp.sigla, value: resp.id_uf }))
      setFederacoes(list)
    } catch (e) {
      GetFederacoes()
    }
  }

  const GetCEP = async () => {
    const options = {
      method: 'GET',
      url: 'https://dev.renovetecnologia.org/webrunstudio/WS_CEP.rule',
      params: { JSON: { "cep": propriedade.cep }, sys: 'SIS' },
      headers: {
        Authorization: user.token
      }
    }
    const { data } = await axios.request(options)
    console.log(data)
    const uf = federacoes.filter(resp => resp.label == data.uf).map(({ value }) => value)[0]
    if (String(data).length > 0) {
      setPropriedade({
        ...propriedade,
        complemento: data.complemento,
        logradouro: data.logradouro,
        bairro: data.bairro,
        municipio: data.localidade,
        // latitude: data.latitude,
        // longitude: data.longitude,
        uf
      })
    } else {
      console.log('Aqui')
      ViaCep()
    }
  }

  const ViaCep = async () => {
    const { data } = await axios(`https://viacep.com.br/ws/${propriedade.cep}/json/`)
    !data.erro && propriedade.id_propriedade === undefined && setPropriedade({
      ...propriedade,
      complemento: data.complemento,
      logradouro: data.logradouro,
      bairro: data.bairro,
      municipio: data.localidade,
      uf: federacoes.filter(resp => resp.label == data.uf).map(({ value }) => value)[0]
    })
  }

  const GetLocation = async () => {

    function toDegreesMinutesAndSeconds(coordinate) {
      var absolute = Math.abs(coordinate);
      var degrees = Math.floor(absolute);
      var minutesNotTruncated = (absolute - degrees) * 60;
      var minutes = Math.floor(minutesNotTruncated);
      var seconds = Math.floor((minutesNotTruncated - minutes) * 60);
      return degrees + "º " + minutes + "' " + seconds + "\"";
    }
    Geolocation.getCurrentPosition(({ coords }) => {
      setPropriedade({
        ...propriedade,
        latitude: `${toDegreesMinutesAndSeconds(coords.latitude)} ${coords.latitude >= 0 ? "N" : "S"}`,
        longitude: `${toDegreesMinutesAndSeconds(coords.longitude)} ${coords.longitude >= 0 ? "E" : "W"}`
      })
    })
  }

  const MaskCoords = (value = '') => {
    const coord = value.replace(/[^a-z\d]/i, '')
      .replace(/(\d{2})(\d)/, '$1º $2')
      .replace(/(\d{2})(\d)/, '$1\' $2')
      .replace(/(\d{2})(\d)/, '$1,$2')
      .replace(/(\d{2},)(\d{2})/, '$1$2"')
    return coord
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
          placeholder="Condições de posse e uso da terra"
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
          placeholder='Município'
          onChangeText={text => setPropriedade({ ...propriedade, municipio: text })}
          value={propriedade.municipio}
          width="100%"
        />
        <InputAnimated
          placeholder='Latitude'
          onChangeText={text => setPropriedade({ ...propriedade, latitude: MaskCoords(text) })}
          value={propriedade.latitude}
          width="39%"
        />
        <InputAnimated
          // maxLength={7}
          placeholder='Longitude'
          onChangeText={text => setPropriedade({ ...propriedade, longitude: text })}
          value={propriedade.longitude}
          width="39%"
        />
        <LocationButton
          onPress={GetLocation}
        >
          <MaterialIcons name="my-location" size={30} color="#fff" />
        </LocationButton>
      </Row>
    </Form>
  )
}
