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

const purchases = [
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
        supplier: 'JBL - Tecnologia e inovações'
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
        supplier: 'JBL - Tecnologia e inovações'
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
        supplier: 'JBL - Tecnologia e inovações'
    },
]

// TODO: change to component: Data table 
// TODO: Create an pattern component to tables
function PurchasesTable() {
    return (
        <Table>
            <TableCaption>Cadastre fornecedores de fora do sistema ou solicite produtos para fornecedores já cadastrados no sistema!</TableCaption>
            <TableHeader className="bg-wise-hyper_black text-wise-light_white">
                <TableRow className="hover:bg-wise-hyper_black">
                    <TableHead className="w-[50px]">
                        <Checkbox />
                    </TableHead>

                    <TableHead>Fornecedor</TableHead>
                    <TableHead className="text-center">Qtd. de produtos</TableHead>
                    <TableHead className="text-center">Data da compra</TableHead>
                    <TableHead className="text-center">Total (R$)</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    purchases.map((purchase, idx) => {
                        return (
                            <TableRow key={idx}>
                                <TableCell>
                                    <Checkbox />
                                </TableCell>

                                <TableCell>{purchase.supplier}</TableCell>
                                <TableCell className="text-center">{purchase.products.length}</TableCell>
                                <TableCell className="text-center">{purchase.created_at}</TableCell>
                                <TableCell className="text-center">{purchase.total}</TableCell>
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

export { PurchasesTable }