import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { createContext, useState } from "react";

const ReportsContext = createContext()

function ReportsContextProvider({children}) {
    const [reports, setReports] = useState([])
    const { toast } = useToast()

    function refreshReports() {
        const credentials = localStorage.getItem('credentials')
        if(!credentials) {
            return
        }
        const token = JSON.parse(credentials).token

        fetch(`${import.meta.env.VITE_API_BASE_URL}/report`, {
            headers: {
              "Authorization": `Bearded ${token}`
            }
        }).then(json => json.json()).then(data => setReports(data)).catch(error => {
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
        <ReportsContext.Provider value={{reports, setReports, refreshReports}}>
            {children}
        </ReportsContext.Provider>
    );
}

export { ReportsContextProvider, ReportsContext }