import { createContext, useEffect, useState } from "react";

const ProductsContext = createContext()

function ProductsContextProvider({children}) {
    const [products, setProducts] = useState([])

    function refreshProducts() {
        const credentials = localStorage.getItem('credentials')
        if(!credentials) {
            return
        }
        const token = JSON.parse(credentials).token

        fetch(`${import.meta.env.VITE_API_BASE_URL}/product`, {
            headers: {
              "Authorization": `Bearded ${token}`
            }
        }).then(json => json.json()).then(data => setProducts(data))
    }

    return (
        <ProductsContext.Provider value={{products, setProducts, refreshProducts}}>
            {children}
        </ProductsContext.Provider>
    );
}

export { ProductsContextProvider, ProductsContext }