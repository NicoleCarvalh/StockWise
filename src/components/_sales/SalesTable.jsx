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

const sales = [
    {
        products: [
            {
                name: 'Prod 1'
            },
            {
                name: 'Prod 2'
            }
        ],
        created_at: '20/04/2024',
        total: 2000,
        payment_method: 'PIX'
    },
    {
        products: [
            {
                name: 'Prod 1'
            },
            {
                name: 'Prod 2'
            }
        ],
        created_at: '20/04/2024',
        total: 2000,
        payment_method: 'PIX'
    },
    {
        products: [
            {
                name: 'Prod 1'
            },
            {
                name: 'Prod 2'
            }
        ],
        created_at: '20/04/2024',
        total: 2000,
        payment_method: 'PIX'
    },
]

// TODO: change to component: Data table 
// TODO: Create an pattern component to tables
function SalesTable() {
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
                    sales.map((sale, idx) => {
                        return (
                            <TableRow key={idx}>
                                <TableCell>
                                    <Checkbox />
                                </TableCell>

                                <TableCell className="font-medium">{sale.products.length}</TableCell>
                                <TableCell className="text-center">{sale.created_at}</TableCell>
                                <TableCell className="text-center">{sale.total}</TableCell>
                                <TableCell className="text-center">{sale.payment_method}</TableCell>
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