import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { createContext, useState } from "react";

const PurchasesContext = createContext()

function PurchasesContextProvider({children}) {
    const [purchase, setPurchases] = useState([])
    const { toast } = useToast()

    function refreshPurchases() {
        const credentials = localStorage.getItem('credentials')
        if(!credentials) {
            return
        }
        const token = JSON.parse(credentials).token

        fetch(`${import.meta.env.VITE_API_BASE_URL}/transaction`, {
            headers: {
              "Authorization": `Bearded ${token}`
            }
        }).then(json => json.json()).then(data => setPurchases(data)).catch(error => {
            toast({
                title: "Ocorreu um erro durante a busca por compras!",
                variant: "destructive",
                description: <p>{error?.message} <br/> Favor, saia do sistema e faça o login novamente.</p>,
                action: (
                  <ToastAction altText="Fechar" onClick={() => window.location.href = "/"}>Ir para o login</ToastAction>
                )
            })
        })
    }

    return (
        <PurchasesContext.Provider value={{purchase, setPurchases, refreshPurchases}}>
            {children}
        </PurchasesContext.Provider>
    );
}

export { PurchasesContextProvider, PurchasesContext }