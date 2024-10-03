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
import { Expand, Trash2 } from "lucide-react"

const employees = [
    {
        photo_url: null,
        name: 'João Henrique Cavalcante',
        email: 'joão.cavalcante@gmail.com',
        role: 'Gerente de estoque',
        created_at: '20/07/2024'
    },
    {
        photo_url: null,
        name: 'João Henrique Cavalcante',
        email: 'joão.cavalcante@gmail.com',
        role: 'Gerente de estoque',
        created_at: '20/07/2024'
    },
    {
        photo_url: null,
        name: 'João Henrique Cavalcante',
        email: 'joão.cavalcante@gmail.com',
        role: 'Gerente de estoque',
        created_at: '20/07/2024'
    },
    {
        photo_url: null,
        name: 'João Henrique Cavalcante',
        email: 'joão.cavalcante@gmail.com',
        role: 'Gerente de estoque',
        created_at: '20/07/2024'
    },
    {
        photo_url: null,
        name: 'João Henrique Cavalcante',
        email: 'joão.cavalcante@gmail.com',
        role: 'Gerente de estoque',
        created_at: '20/07/2024'
    }
]

// TODO: change to component: Data table 
// TODO: Create an pattern component to tables
function EmployeesTable() {
    return (
        <Table>
            <TableCaption>Cadastre novos funcionários dos setores de estoque e vendas e gerencie suas permissões.</TableCaption>
            <TableHeader className="bg-wise-hyper_black text-wise-light_white">
                <TableRow className="hover:bg-wise-hyper_black">
                    <TableHead className="w-[50px]">
                        <Checkbox />
                    </TableHead>

                    <TableHead>Foto</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-center">Cargo</TableHead>
                    <TableHead className="text-center">Data de contratação</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    employees.map((employee, idx) => {
                        return (
                            <TableRow key={idx}>
                                <TableCell>
                                    <Checkbox />
                                </TableCell>

                                <TableCell>
                                    <img src={employee.photo_url ?? '/default_profile_image.jpg'} alt={employee.name} className="size-[35px] rounded-full" />
                                </TableCell>

                                <TableCell>{employee.name}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <TableCell className="text-center">{employee.role}</TableCell>
                                <TableCell className="text-center">{employee.created_at}</TableCell>
                                <TableCell className="flex items-center justify-end gap-5">
                                    <Trash2 />
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

export { EmployeesTable }