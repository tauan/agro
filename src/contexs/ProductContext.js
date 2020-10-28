import React, { createContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [activePage, setActivePage] = useState(undefined)
    const [produto, setProduto] = useState({
        categoria: "",
        descricao_produto: "",
        gluten: "",
        unid_medida_produto: "",
        peso_liquido: "",
        peso_bruto: "",
        cod_barras: "",
        dias_validade: "",
        foto_produto: "",
    });
    const [producao, setProducao] = useState({
        inicio_safra: "",
        termino_safra: "",
        producao: "",
        unidade_medida_producao: "",
        qtde_producao: "",
    });
    const [propriedades, setPropriedades] = useState(undefined);
    const [ingredientes, setIngredientes] = useState(undefined);
    const [descricao, setDescricao] = useState(undefined);

    return (
        <ProductContext.Provider
            value={{
                activePage,
                produto,
                producao,
                propriedades,
                ingredientes,
                descricao,
                setActivePage,
                setProduto,
                setProducao,
                setPropriedades,
                setIngredientes,
                setDescricao,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}

export default ProductContext

// export function useProductContext() {
//   const context = useContext(ProductContext);
//   const { contextData, setContextData } = context;
//   return { contextData, setContextData };
// }