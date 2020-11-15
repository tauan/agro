import React, { createContext, useState } from "react";

const Properties = createContext();

export const PropertiesProvider = ({ children }) => {
  const [activePage, setActivePage] = useState()
  const [propriedade, setPropriedade] = useState({
    id_agricultor: undefined,
    descricao: "",
    ccir: "",
    foto: "",
    area: "",
    condicao_posse: "",
    cep: "",
    uf: "",
    logradouro: "",
    bairro: "",
    municipio: "",
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
