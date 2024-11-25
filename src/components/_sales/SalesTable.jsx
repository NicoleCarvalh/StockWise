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
import { SalesContext } from "@/context/SalesContextProvider"
import { UpdateSale } from "./UpdateSale"
import { PdfViewer } from "../_reports/PdfViewer"

// TODO: change to component: Data table 
// TODO: Create an pattern component to tables
function SalesTable() {
    const {credentials} = useContext(AuthContext) 
    const {sales} = useContext(SalesContext) 
    const [salesList, setSalesList] = useState([])
    const { toast } = useToast()

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/transaction`, {
            headers: {
              "Authorization": `Bearded ${credentials.token}`,
            }
          }).then(json => json.json()).then(data => {
            if(data?.ERROR) {
                toast({
                    title: "Ocorreu um erro durante a busca pelas vendas.",
                    variant: "destructive",
                    description: <p>{data?.ERROR} <br/>Tente novamente</p>,
                    action: (
                      <ToastAction altText="Fechar">Fechar</ToastAction>
                    )
                })

                return
            }

            const filteredTransactions = data.filter(transaction => transaction?.type == "SALE")
            let newTransactionsData = []

            filteredTransactions.forEach((transaction) => {
                const orders = JSON.parse(transaction.orders)
  
                let sum = 0
                orders.forEach((order) => {

                    sum += order.quantity
                })

                const newTransaction = {
                    ...transaction,
                    quantityOfProducts: sum,
                }

                newTransactionsData.push(newTransaction)
            })

            setSalesList(newTransactionsData)
          }).catch(error => {
            toast({
                title: "Ocorreu um erro durante a busca pelas vendas.",
                variant: "destructive",
                description: <p>{error?.message} <br/>Tente novamente</p>,
                action: (
                  <ToastAction altText="Fechar">Fechar</ToastAction>
                )
            })
          })
    }, [])

    // useEffect(() => {
    //     setSalesList(sales)
    // }, [sales])


    return (
        <Table>
            <TableCaption>Venda e entenda quais produtos mais saem e o porquê.</TableCaption>
            <TableHeader className="bg-wise-hyper_black text-wise-light_white">
                <TableRow className="hover:bg-wise-hyper_black">
                    <TableHead className="w-[50px]">
                        <Checkbox />
                    </TableHead>

                    <TableHead>Qtd. de produtos</TableHead>
                    <TableHead className="text-center">Data da venda</TableHead>
                    <TableHead className="text-center">Total (R$)</TableHead>
                    <TableHead className="text-center">Forma de pagamento</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    salesList.length > 0 && [...salesList].reverse().map((sale, idx) => {
                        return (
                            <TableRow key={idx}>
                                <TableCell>
                                    <Checkbox />
                                </TableCell>

                                <TableCell >
                                    <span className="font-medium">{sale?.quantityOfProducts ?? '--'}</span> produtos vendidos
                                </TableCell>
                                <TableCell className="text-center">{new Date(sale.createdAt).toLocaleString()}</TableCell>
                                <TableCell className="text-center">{sale.total} reais</TableCell>
                                <TableCell className="text-center">{sale.paymentMethod}</TableCell>
                                <TableCell className="flex items-center justify-end gap-5">                                    
                                    <Dialog>
                                        <DialogTrigger>
                                            <FileText className="cursor-pointer"/>
                                        </DialogTrigger>

                                        <DialogContent className="max-w-[90%] md:max-w-[60%]">
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Venda realizada em {new Date(sale.createdAt).toLocaleString()}
                                                </DialogTitle>

                                                <DialogDescription>
                                                    Analise tudo
                                                </DialogDescription>
                                            </DialogHeader>


                                            {sale?.fileUrl && <PdfViewer url={sale.fileUrl} />}
                                        </DialogContent>
                                    </Dialog>


                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Expand className="cursor-pointer" />
                                        </DialogTrigger>

                                        <DialogContent className="max-w-[90%] md:max-w-[60%]">
                                            <DialogHeader>
                                                <DialogTitle className="text-lg font-semibold border-b-2 border-wise-dark_green py-3">Venda efetuada em <span className="text-wise-dark_green">{new Date(sale?.createdAt)?.toLocaleString()}</span></DialogTitle>

                                                <DialogDescription>
                                                    Visualize e analise todas as informações das suas vendas.
                                                </DialogDescription>
                                            </DialogHeader>

                                           <UpdateSale sale={sale} />
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

export { SalesTable }