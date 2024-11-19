import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { createContext, useState } from "react";

const VirtualStockContext = createContext()

function VirtualStockContextProvider({children}) {
    const [stocks, setStocks] = useState([])
    const { toast } = useToast()

    function refreshStocks() {
        const credentials = localStorage.getItem('credentials')
        if(!credentials) {
            return
        }
        const token = JSON.parse(credentials).token

        fetch(`${import.meta.env.VITE_API_BASE_URL}/virtualStock`, {
            headers: {
              "Authorization": `Bearded ${token}`
            }
        }).then(json => json.json()).then(data => setStocks(data)).catch(error => {
            toast({
                title: "Ocorreu um erro durante a busca por estoques!",
                variant: "destructive",
                description: <p>{error?.message} <br/> Favor, saia do sistema e faça o login novamente.</p>,
                action: (
                  <ToastAction altText="Fechar" onClick={() => window.location.href = "/"}>Ir para o login</ToastAction>
                )
            })
        })
    }

    return (
        <VirtualStockContext.Provider value={{stocks, setStocks, refreshStocks}}>
            {children}
        </VirtualStockContext.Provider>
    );
}

export { VirtualStockContextProvider, VirtualStockContext }