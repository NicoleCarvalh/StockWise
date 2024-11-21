import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Trash2 } from "lucide-react"
import { useContext } from "react"
import { AuthContext } from "@/auth/AuthProvider"
import { ProductsContext } from "@/context/ProductsContextProvider"
import clsx from "clsx"
import { Button } from "./ui/button"
import { VirtualStockContext } from "@/context/VirtualStockContextProvider"

export function DeleteButton({entityDeleted, databaseEntity, variant, callBackAfterDelete, buttonClassName="", children}) {
    const {credentials} = useContext(AuthContext) 
    const { refreshProducts } = useContext(ProductsContext)
    const { refreshStocks } = useContext(VirtualStockContext)

    const { toast } = useToast()

    function deleteEntity() {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/${databaseEntity}/${entityDeleted}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearded ${credentials.token}`
            }
        }).then(json => json.json()).then((excludedEntity) => {
            refreshProducts()
            refreshStocks()
            toast({
                title: `${excludedEntity?.name ?? 'Registro'} excluído com sucesso!`,
                action: (
                  <ToastAction altText="Fechar">Fechar</ToastAction>
                )
            })


            if(callBackAfterDelete) {
                callBackAfterDelete()
            }
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
        variant ? <Button type="button" variant={variant} className={clsx("cursor-pointer", buttonClassName)} onClick={handleDeleteEntity}>
            {children ?? <Trash2 className="cursor-pointer" />}
        </Button> :
        <button type="button" className={clsx("cursor-pointer", buttonClassName)} onClick={handleDeleteEntity}>
            {children ?? <Trash2 className="cursor-pointer" />}
        </button>
    )
}