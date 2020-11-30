import React, { createContext, useState } from "react";

const Properties = createContext();

export const PropertiesProvider = ({ children }) => {
  const [activePage, setActivePage] = useState()
  const [propriedade, setPropriedade] = useState({
    area: undefined,
    bairro: "",
    ccir: "",
    cep: "",
    complemento: "",
    condicoes_posse: "",
    descricao: "",
    foto: null,
    id_agricultor: undefined,
    id_propriedade: undefined,
    latitude: "",
    logradouro: "",
    longitude: "",
    municipio: "",
    n_logradouro: "",
    uf: undefined,
    url: ""
  });
  return (
    <Properties.Provider
      value={{
        activePage,
        propriedade,
        setActivePage,
        setPropriedade,
      }}
    >
      {children}
    </Properties.Provider>
  );
}

export default Properties
