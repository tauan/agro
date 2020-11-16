import React, { createContext, useState } from "react";

const Tags = createContext();

export const TagsProvider = ({ children }) => {
  const [activePage, setActivePage] = useState()
  const [etiquetas, setEtiquetas] = useState({
    id_agricultor: undefined,
    id_produto: undefined,
    emissao: "",
    validade: "",
    descricao: "",
    lote: undefined,
    quantidade: undefined,
    modelo: "",
    chave_identificador: undefined
  });
  return (
    <Tags.Provider
      value={{
        activePage,
        etiquetas, 
        setActivePage,
        setEtiquetas,
      }}
    >
      {children}
    </Tags.Provider>
  );
}

export default Tags
