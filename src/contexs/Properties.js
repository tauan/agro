import React, { createContext, useState } from "react";

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [propriedades, setPropriedades] = useState({
    id_agricultor: "",
    nome_propriedade: "",
    ccir: "",
    area: "",
    condicao_posse: "",
    cep: "",
    uf: "",
    endereco: "",
    bairro: "",
    cidade: "",
  });
  return (
    <PropertyContext.Provider value={{ propriedades, setPropriedades }}>
      {children}
    </PropertyContext.Provider>
  );
};

export default PropertyContext;
