import React, { createContext, useState } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [activePage, setActivePage] = useState()
  const [user, setUser] = useState({})
  const [profile, setProfile] = useState({
    id_agricultor: undefined,
    nome: "",
    cpf: "",
    rg: "",
    data_nascimento: "",
    cep_propriedade: "",
    logradouro_propriedade: "",
    bairro_propriedade: "",
    municipio: "",
    uf: "",
    telefone_1: "",
    telefone_2: "",
    email: "",
    facebook: "",
    instagram: "",
    site: "",
    insc_ceasa: "",
    foto: "",
    insc_estadual_prod: "",
    complemento: "",
    registro_sanitario: "",
    id_uf: undefined,
    n_logradouro: "",
    id_sindicato: undefined,
    id_sexo: undefined,
    alvara: "",
    telefone_3: "",
    mapa: "",
    filiado_sindicato: "",
    tipo_pessoa: "",
    cooperativa_associacao: "",
    id_cidade: undefined,
    id_cooperativa_associacao: undefined
  })
  return (
    <UserContext.Provider value={{ activePage, user, profile, setActivePage, setUser, setProfile }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext