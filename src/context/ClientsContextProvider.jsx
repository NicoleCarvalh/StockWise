import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { createContext, useState } from "react";

const ClientContext = createContext()

function ClientContextProvider({children}) {
    const [clients, setClients] = useState([])
    const { toast } = useToast()

    function refreshClients() {
        const credentials = localStorage.getItem('credentials')
        if(!credentials) {
            return
        }
        const token = JSON.parse(credentials).token

        fetch(`${import.meta.env.VITE_API_BASE_URL}/client`, {
            headers: {
              "Authorization": `Bearded ${token}`
            }
        }).then(json => json.json()).then(data => setClients(data)).catch(error => {
            toast({
                title: "Ocorreu um erro durante a busca por clientes!",
                variant: "destructive",
                description: <p>{error?.message} <br/> Favor, saia do sistema e faça o login novamente.</p>,
                action: (
                  <ToastAction altText="Fechar" onClick={() => window.location.href = "/"}>Ir para o login</ToastAction>
                )
            })
        })
    }

    return (
        <ClientContext.Provider value={{clients, setClients, refreshClients}}>
            {children}
        </ClientContext.Provider>
    );
}

export { ClientContextProvider, ClientContext }