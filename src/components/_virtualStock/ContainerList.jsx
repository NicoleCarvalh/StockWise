import { Plus } from "lucide-react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "@/auth/AuthProvider"
import { VirtualStockContext } from "@/context/VirtualStockContextProvider"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "../ui/toast"
import { DialogDescription } from "@radix-ui/react-dialog"
import { UpdateContainer } from "./UpdateContainer"

export function ContainerList() {
    const {credentials} = useContext(AuthContext) 
    const {stocks} = useContext(VirtualStockContext) 
    const [virtualStocks, setVirtualStocks] = useState([])
    const updateContainerModalRef = useRef()
    const { toast } = useToast()

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/virtualStock`, {
            headers: {
              "Authorization": `Bearded ${credentials.token}`,
            }
          }).then(json => json.json()).then(data => {
            if(data?.ERROR) {
                toast({
                    title: "Ocorreu um erro durante a busca pelos estoques.",
                    variant: "destructive",
                    description: <p>{data?.ERROR} <br/>Tente novamente</p>,
                    action: (
                      <ToastAction altText="Fechar">Fechar</ToastAction>
                    )
                })

                return
            }

            setVirtualStocks(data)
          }).catch(error => {
            toast({
                title: "Ocorreu um erro durante a busca por estoques.",
                variant: "destructive",
                description: <p>{error?.message} <br/>Tente novamente</p>,
                action: (
                  <ToastAction altText="Fechar">Fechar</ToastAction>
                )
            })
          })
    }, [])

    useEffect(() => {
        setVirtualStocks(stocks)
    }, [stocks])

    return (
        <>
            {
                virtualStocks.length > 0 ? virtualStocks.map((container, containerIDX) => (
                    <Dialog key={containerIDX}>
                        <DialogTrigger asChild ref={updateContainerModalRef}>
                            <div className="flex flex-col gap-3 justify-between bg-wise-hyper_white rounded-lg p-5 cursor-pointer">
                                <div>
                                    <h2 className="text-xl w-full flex justify-between items-center font-semibold">
                                        {container.name}
                                        <span className="text-wise-dark_green text-sm">{container.code}</span>
                                    </h2>
                                    <p className="text-sm font-light">{container.description}</p>
                                </div>

                                <div className="flex flex-wrap gap-4 justify-between">
                                    <h3 className="text-wise-dark_green">Local</h3>
                                    <p>{container.place}</p>
                                </div>
                            </div> 
                        </DialogTrigger>

                        <DialogContent className="max-w-[50%]">
                            <DialogHeader>
                                <DialogTitle className="flex justify-between py-5 border-b-2 border-b-wise-dark_green font-semibold text-xl">
                                    Virtual Stock
                                    
                                    <span className="text-wise-dark_green text-base">{container.code}</span>
                                </DialogTitle>  

                                <DialogDescription className="font-normal text-base flex flex-col gap-2">
                                    Organize seus produtos fisicamente e replique aqui, assim você pode otimizar a logística, economizar tempo e melhorar a organização dos seus produtos!
                                </DialogDescription>                              
                            </DialogHeader>

                            <UpdateContainer container={container} closeCurrentModal={() => updateContainerModalRef?.current.click()} />
                        </DialogContent>
                    </Dialog>
                    
                )) : <i>Não foram criados containers ainda...</i>
            }
        </>
    )
}