import React, { createContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [activePage, setActivePage] = useState()
    const [produto, setProduto] = useState({
        id_produto: undefined,
        id_agricultor: undefined,
        id_categoria: "",
        descricao: "",
        gluten: "",
        peso_liquido: "",
        peso_bruto: "",
        codigo_barras: "",
        dias_validade: "",
        url_imagem: "https://freeiconshop.com/wp-content/uploads/edd/camera-flat.png",
        foto: "",
        observacao: "",
        id_produto_base: undefined,
        mes_inicial_plantio: "",
        mes_final_plantio: "",
        tipo_producao: "",
        unidade_medida_1: "",
        unidade_medida_2: "",
        quantidade_producao: "",
        in_natura: [],
        propriedades: []
    });
    const [propriedades, setPropriedades] = useState([]);
    const [ingredientes, setIngredientes] = useState([]);
    return (
        <ProductContext.Provider
            value={{
                activePage,
                produto,
                propriedades,
                ingredientes,
                setActivePage,
                setProduto,
                setPropriedades,
                setIngredientes,
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