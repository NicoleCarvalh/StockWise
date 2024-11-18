import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { createContext, useEffect, useState } from "react";

const SalesContext = createContext()

function SalesContextProvider({children}) {
    const [sales, setSales] = useState([])
    const { toast } = useToast()

    // useEffect(() => {
    //     console.log("SALES mudou")
    //     console.log(sales)
    // }, [sales])

    function refreshSales() {
        const credentials = localStorage.getItem('credentials')
        if(!credentials) {
            return
        }
        const token = JSON.parse(credentials).token

        fetch(`${import.meta.env.VITE_API_BASE_URL}/transaction`, {
            headers: {
              "Authorization": `Bearded ${token}`
            }
        }).then(json => json.json()).then(data => setSales(data)).catch(error => {
            toast({
                title: "Ocorreu um erro durante a busca por vendas!",
                variant: "destructive",
                description: <p>{error?.message} <br/> Favor, saia do sistema e faça o login novamente.</p>,
                action: (
                  <ToastAction altText="Fechar" onClick={() => window.location.href = "/"}>Ir para o login</ToastAction>
                )
            })
        })
    }

    return (
        <SalesContext.Provider value={{sales, setSales, refreshSales}}>
            {children}
        </SalesContext.Provider>
    );
}

export { SalesContextProvider, SalesContext }