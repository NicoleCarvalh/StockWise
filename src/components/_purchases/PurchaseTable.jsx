import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Expand, FileText } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "@/auth/AuthProvider"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "../ui/toast"
import { PurchasesContext } from "@/context/PurchasesContextProvider"
import { UpdatePurchase } from "./UpdatePurchase"

// TODO: change to component: Data table 
// TODO: Create an pattern component to tables
function PurchasesTable() {
    const {credentials} = useContext(AuthContext) 
    const {purchases} = useContext(PurchasesContext) 
    const [purchasesList, setPurchasesList] = useState([])
    const { toast } = useToast()

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/transaction`, {
            headers: {
              "Authorization": `Bearded ${credentials.token}`,
            }
          }).then(json => json.json()).then(data => {
            console.log(data)
            if(data?.ERROR) {
                toast({
                    title: "Ocorreu um erro durante a busca pelas compras.",
                    variant: "destructive",
                    description: <p>{data?.ERROR} <br/>Tente novamente</p>,
                    action: (
                      <ToastAction altText="Fechar">Fechar</ToastAction>
                    )
                })

                return
            }

            const filteredTransactions = data.filter(transaction => transaction?.type == "PURCHASE")
            let newTransactionsData = []

            filteredTransactions.forEach((transaction) => {
                const orders = JSON.parse(transaction.orders)
  
                let sum = 0
                orders.forEach((order) => sum += order.quantity)

                const newTransaction = {
                    ...transaction,
                    quantityOfProducts: sum
                }

                newTransactionsData.push(newTransaction)
            })


            setPurchasesList(newTransactionsData)
          }).catch(error => {
            toast({
                title: "Ocorreu um erro durante a busca pelas compras.",
                variant: "destructive",
                description: <p>{error?.message} <br/>Tente novamente</p>,
                action: (
                  <ToastAction altText="Fechar">Fechar</ToastAction>
                )
            })
          })
    }, [])

    useEffect(() => {
        setPurchasesList(purchases)
    }, [purchases])


    return (
        <Table>
            <TableCaption>Venda e entenda quais produtos mais saem e o porquê.</TableCaption>
            <TableHeader className="bg-wise-hyper_black text-wise-light_white">
                <TableRow className="hover:bg-wise-hyper_black">
                    <TableHead className="w-[50px]">
                        <Checkbox />
                    </TableHead>

                    <TableHead>Qtd. de produtos</TableHead>
                    <TableHead className="text-center">Data da compra</TableHead>
                    <TableHead className="text-center">Total pago (R$)</TableHead>
                    <TableHead className="text-center">Forma de pagamento</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    purchasesList && purchasesList.length > 0 && [...purchasesList].reverse().map((purchase, idx) => {
                        // console.log("SALE AQUI")
                        // console.log(purchase)
                        return (
                            <TableRow key={idx}>
                                <TableCell>
                                    <Checkbox />
                                </TableCell>

                                <TableCell className="font-medium">{purchase?.quantityOfProducts ?? '--'}</TableCell>
                                <TableCell className="text-center">{new Date(purchase.createdAt).toLocaleString()}</TableCell>
                                <TableCell className="text-center">{purchase.total} reais</TableCell>
                                <TableCell className="text-center">{purchase.paymentMethod}</TableCell>
                                <TableCell className="flex items-center justify-end gap-5">
                                    <FileText className="cursor-pointer" onClick={() => alert("O recibo desta compra já esta sendo baixada, aguarde um instante.")} />
                                    
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Expand className="cursor-pointer" />
                                        </DialogTrigger>

                                        <DialogContent className="max-w-[90%] md:max-w-[60%]">
                                            <DialogHeader>
                                                <DialogTitle className="text-lg font-semibold border-b-2 border-wise-dark_green py-3">Compra realizada em <span className="text-wise-dark_green">{new Date(purchase?.createdAt)?.toLocaleString()}</span></DialogTitle>

                                                <DialogDescription>
                                                    Visualize e analise todas as informações das suas compras.
                                                </DialogDescription>
                                            </DialogHeader>

                                           <UpdatePurchase purchase={purchase} />
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    )
}

export { PurchasesTable }