import React, { createContext, useState } from "react";

const Tags = createContext();

export const TagsProvider = ({ children }) => {
  const [activePage, setActivePage] = useState()
  const [etiquetas, setEtiquetas] = useState({
    id_agricultor: 36,
    id_produto: 16,
    emissao: "",
    validade: "",
    descricao: "",
    lote: undefined,
    quantidade: 12,
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
