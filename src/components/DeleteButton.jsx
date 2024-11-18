import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Trash2 } from "lucide-react"
import { useContext } from "react"
import { AuthContext } from "@/auth/AuthProvider"
import { ProductsContext } from "@/context/ProductsContextProvider"

export function DeleteButton({entityDeleted, databaseEntity}) {
    const {credentials} = useContext(AuthContext) 
    const { refreshProducts } = useContext(ProductsContext)
    const { toast } = useToast()

    function deleteEntity() {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/${databaseEntity}/${entityDeleted}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearded ${credentials.token}`
            }
        }).then(json => json.json()).then((excludedEntity) => {
            refreshProducts()
            toast({
                title: `${excludedEntity?.name ?? 'Registro'} excluído com sucesso!`,
                action: (
                  <ToastAction altText="Fechar">Fechar</ToastAction>
                )
            })
        }).catch((error) => {
            toast({
                title: "Ocorreu um erro durante a exclusão!",
                variant: "destructive",
                description: <p>{error?.message} <br/> Tente novamente.</p>,
                action: (
                  <ToastAction altText="Fechar">Fechar</ToastAction>
                )
            })
        })
    }

    function handleDeleteEntity() {
        toast({
            title: "Confirmação para a deleção.",
            description: <p>Você deseja confirmar a exclusão?</p>,
            action: (
                <ToastAction altText="Fechar" className="bg-wise-dark_red text-white hover:border-2 hover:border-wise-dark_red hover:text-wise-dark_red hover:bg-transparent" onClick={deleteEntity}>Confirmar</ToastAction>
            )
        })
    }

    return (
        <button type="button" className="cursor-pointer" onClick={handleDeleteEntity}>
            <Trash2 className="cursor-pointer" />
        </button>
    )
}