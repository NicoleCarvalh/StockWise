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
import { Trash2, Expand, QrCode } from "lucide-react"

const products = [
    {
        name: 'Fone de ouvido JBL - TUNET 510',
        stock: 120,
        code: 'INV001',
        category: 'Eletrônico'
    },
    {
        name: 'Fone de ouvido JBL - TUNET 510',
        stock: 120,
        code: 'INV001',
        category: 'Eletrônico'
    },
    {
        name: 'Fone de ouvido JBL - TUNET 510',
        stock: 120,
        code: 'INV001',
        category: 'Eletrônico'
    },
    {
        name: 'Fone de ouvido JBL - TUNET 510',
        stock: 120,
        code: 'INV001',
        category: 'Eletrônico'
    },
    {
        name: 'Fone de ouvido JBL - TUNET 510',
        stock: 120,
        code: 'INV001',
        category: 'Eletrônico'
    },
    {
        name: 'Fone de ouvido JBL - TUNET 510',
        stock: 120,
        code: 'INV001',
        category: 'Eletrônico'
    },
    {
        name: 'Fone de ouvido JBL - TUNET 510',
        stock: 120,
        code: 'INV001',
        category: 'Eletrônico'
    },
    {
        name: 'Fone de ouvido JBL - TUNET 510',
        stock: 120,
        code: 'INV001',
        category: 'Eletrônico'
    },
    {
        name: 'Fone de ouvido JBL - TUNET 510',
        stock: 120,
        code: 'INV001',
        category: 'Eletrônico'
    },
    {
        name: 'Fone de ouvido JBL - TUNET 510',
        stock: 120,
        code: 'INV001',
        category: 'Eletrônico'
    },
    {
        name: 'Fone de ouvido JBL - TUNET 510',
        stock: 120,
        code: 'INV001',
        category: 'Eletrônico'
    },
    {
        name: 'Fone de ouvido JBL - TUNET 510',
        stock: 120,
        code: 'INV001',
        category: 'Eletrônico'
    },
    {
        name: 'Fone de ouvido JBL - TUNET 510',
        stock: 120,
        code: 'INV001',
        category: 'Eletrônico'
    },
]

// TODO: change to component: Data table 
// TODO: Create an pattern component to tables
function ProductsTable() {
    return (
        <Table>
            <TableCaption>Cadastre mais produtos... Venda mais.</TableCaption>
            <TableHeader className="bg-wise-hyper_black text-wise-light_white">
                <TableRow className="hover:bg-wise-hyper_black">
                    <TableHead className="w-[50px]">
                        <Checkbox />
                    </TableHead>

                    <TableHead className="w-[100px]">Código</TableHead>
                    <TableHead className="min-w-[200px]">Nome</TableHead>
                    <TableHead className="text-center">Estoque</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    products.map((product, idx) => {
                        return (
                            <TableRow key={idx}>
                                <TableCell>
                                    <Checkbox />
                                </TableCell>

                                <TableCell className="font-medium">{product.code}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell className="text-center">{product.stock}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell className="flex items-center justify-end gap-5">
                                    <QrCode className="cursor-pointer" />
                                    <Trash2 className="cursor-pointer" />
                                    <Expand className="cursor-pointer" />
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    )
}

export { ProductsTable }