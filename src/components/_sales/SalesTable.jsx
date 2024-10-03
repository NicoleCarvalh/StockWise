import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

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
                                    <FileText />
                                    <Expand />
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