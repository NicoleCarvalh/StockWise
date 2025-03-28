import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { createContext, useState } from "react";

const ProductsContext = createContext()

function ProductsContextProvider({children}) {
    const [products, setProducts] = useState([])
    const { toast } = useToast()

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
        }).then(json => json.json()).then(data => {
            setProducts(data)
        }).catch(error => {
            toast({
                title: "Ocorreu um erro durante a busca por produtos!",
                variant: "destructive",
                description: <p>{error?.message} <br/> Favor, saia do sistema e faça o login novamente.</p>,
                action: (
                  <ToastAction altText="Fechar" onClick={() => window.location.href = "/"}>Ir para o login</ToastAction>
                )
            })
        })
    }

    return (
        <ProductsContext.Provider value={{products, setProducts, refreshProducts}}>
            {children}
        </ProductsContext.Provider>
    );
}

export { ProductsContextProvider, ProductsContext }