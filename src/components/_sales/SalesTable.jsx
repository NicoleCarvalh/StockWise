import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
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

// TODO: change to component: Data table 
// TODO: Create an pattern component to tables
function SalesTable() {
    const {credentials} = useContext(AuthContext) 
    const {sales, refreshSales} = useContext(SalesContext) 
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

            setSalesList(data)
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

    useEffect(() => {
        // console.log("AQUI SALES")
        // console.log(sales)
        setSalesList(sales)
    }, [sales])

    // console.log("sales")
    // console.log(sales)
    // console.log("salesList")
    // console.log(salesList)


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
                    salesList.length > 0 && salesList.map((sale, idx) => {
                        // console.log("SALE AQUI")
                        // console.log(sale)
                        return (
                            <TableRow key={idx}>
                                <TableCell>
                                    <Checkbox />
                                </TableCell>

                                <TableCell className="font-medium">{sale?.products?.length ?? 'erro aqui'}</TableCell>
                                <TableCell className="text-center">{new Date(sale.createdAt).toLocaleString()}</TableCell>
                                <TableCell className="text-center">{sale.total} reais</TableCell>
                                <TableCell className="text-center">{sale.paymentMethod}</TableCell>
                                <TableCell className="flex items-center justify-end gap-5">
                                    <FileText className="cursor-pointer" onClick={() => alert("O recibo desta venda já esta sendo baixada, aguarde um instante.")} />
                                    
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Expand className="cursor-pointer" />
                                        </DialogTrigger>

                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle className="text-lg font-semibold border-b-2 border-wise-dark_green py-3">{sale.name}</DialogTitle>
                                            </DialogHeader>

                                            <form method="" action="" className="flex flex-col gap-2">

                                                <div className="flex flex-col gap-2">
                                                    <Label htmlFor="name">
                                                        Nome
                                                    </Label>

                                                    <Input id="name" required value={sale.name} />
                                                </div>

                                                <div className="flex gap-2">
                                                    <div className="flex flex-col gap-2 w-full">
                                                        <Label htmlFor="photo">
                                                            Foto
                                                        </Label>

                                                        <Input type="file" id="photo" name="photo" onChange={(ev) => handlePhotoPreview(idx, ev)}  />
                                                    </div>

                                                    {
                                                        sale.photo_url && (
                                                        <div className="max-h-full h-full flex-1 flex items-center justify-end">
                                                            <img src={sale.photo_url} alt="" className="h-full max-w-[80px] object-cover rounded-sm" />
                                                        </div>
                                                        )
                                                    }
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <Label htmlFor="email">
                                                        E-mail
                                                    </Label>

                                                    <Input id="email" type="email" required value={sale.email} />
                                                </div>

                                                <div className="flex flex-col gap-2 flex-1">
                                                    <Label htmlFor="password">
                                                        Senha
                                                    </Label>

                                                    <Input id="password" type="password" required value={sale.password} />
                                                </div>

                                                <div className="flex flex-col gap-2 flex-1">
                                                    <Label htmlFor="role">
                                                        Cargo
                                                    </Label>

                                                    <Input list="role_list" id="role" name="role" required value={sale.role} />
                                                    <datalist id="role_list">
                                                        <option value="Vendedor">Vendedor</option>
                                                        <option value="Gerente de estoque">Gerente de estoque</option>
                                                    </datalist>
                                                </div>
                                                

                                                <div className="flex-1 flex gap-2 flex-wrap">
                                                    <Button type="submit" className="flex-1 flex items-center justify-center">Atualizar cadastro</Button>
                                                </div>
                                            </form>
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