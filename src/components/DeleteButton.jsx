import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Trash2 } from "lucide-react"

export function DeleteButton({entityName, entityDeleted}) {
    const { toast } = useToast()

    return (
        <button type="button" className="cursor-pointer" onClick={() => toast({
            title: "Exclusão feita!",
            description: <p>{entityName} <span className="font-semibold">{entityDeleted}</span> foi excluído do sistema com sucesso.</p>,
            action: (
                <ToastAction altText="Fechar">Desfazer</ToastAction>
            )
        })}>

            <Trash2 className="cursor-pointer" />
        </button>
    )
}