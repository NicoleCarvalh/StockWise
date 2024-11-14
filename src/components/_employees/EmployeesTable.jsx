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
import { Expand } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { DeleteButton } from "../DeleteButton"

const employees = [
    {
        photo_url: "https://bloody-disgusting.com/wp-content/uploads/2022/03/a24-men-trailer.png",
        name: 'Trevis Scooby Doo',
        email: 'joão.cavalcante@gmail.com',
        password: "1234554321",
        role: 'Gerente de estoque',
        created_at: '20/07/2024'
    },
    {
        photo_url: null,
        name: 'James Bond Trevo',
        email: 'joão.cavalcante@gmail.com',
        password: "1234554321",
        role: 'Gerente de estoque',
        created_at: '20/07/2024'
    },
    {
        photo_url: null,
        name: 'João Henrique Cavalcante',
        email: 'joão.cavalcante@gmail.com',
        password: "1234554321",
        role: 'Vendedor',
        created_at: '20/07/2024'
    },
    {
        photo_url: null,
        name: 'Jorge Carlos Olinda',
        email: 'joão.cavalcante@gmail.com',
        password: "1234554321",
        role: 'Gerente de estoque',
        created_at: '20/07/2024'
    },
    {
        photo_url: null,
        name: 'Terezo Cavalcante',
        email: 'joão.cavalcante@gmail.com',
        password: "1234554321",
        role: 'Vendedor',
        created_at: '20/07/2024'
    }
]

// TODO: change to component: Data table 
// TODO: Create an pattern component to tables
function EmployeesTable() {
    function handlePhotoPreview(idx, ev) {
      if(ev.target.files && ev.target.files[0]) {
        // URL.createObjectURL(ev.target.files[0])

        employees[idx].photo_url = URL.createObjectURL(ev.target.files[0])
      }
    }

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
                        // employee.photo_url && setPhotoUrl(employee.photo_url)
                        // employee.photo_url && setPhotoExists(true)

                        return (
                            <TableRow key={idx}>
                                <TableCell>
                                    <Checkbox />
                                </TableCell>

                                <TableCell>
                                    <img src={employee.photo_url ?? '/default_profile_image.jpg'} alt={employee.name} className="size-[35px] rounded-full object-cover" />
                                </TableCell>

                                <TableCell>{employee.name}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <TableCell className="text-center">{employee.role}</TableCell>
                                <TableCell className="text-center">{employee.created_at}</TableCell>
                                <TableCell className="flex items-center justify-end gap-5">
                                    <DeleteButton entityName="Funcionário(a)" entityDeleted={employee.name} />
                                    
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Expand className="cursor-pointer" />
                                        </DialogTrigger>

                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle className="text-lg font-semibold border-b-2 border-wise-dark_green py-3">{employee.name}</DialogTitle>
                                            </DialogHeader>

                                            <form method="" action="" className="flex flex-col gap-2">

                                                <div className="flex flex-col gap-2">
                                                    <Label htmlFor="name">
                                                        Nome
                                                    </Label>

                                                    <Input id="name" required value={employee.name} />
                                                </div>

                                                <div className="flex gap-2">
                                                    <div className="flex flex-col gap-2 w-full">
                                                        <Label htmlFor="photo">
                                                            Foto
                                                        </Label>

                                                        <Input type="file" id="photo" name="photo" onChange={(ev) => handlePhotoPreview(idx, ev)}  />
                                                    </div>

                                                    {
                                                        employee.photo_url && (
                                                        <div className="max-h-full h-full flex-1 flex items-center justify-end">
                                                            <img src={employee.photo_url} alt="" className="h-full max-w-[80px] object-cover rounded-sm" />
                                                        </div>
                                                        )
                                                    }
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <Label htmlFor="email">
                                                        E-mail
                                                    </Label>

                                                    <Input id="email" type="email" required value={employee.email} />
                                                </div>

                                                <div className="flex flex-col gap-2 flex-1">
                                                    <Label htmlFor="password">
                                                        Senha
                                                    </Label>

                                                    <Input id="password" type="password" required value={employee.password} />
                                                </div>

                                                <div className="flex flex-col gap-2 flex-1">
                                                    <Label htmlFor="role">
                                                        Cargo
                                                    </Label>

                                                    <Input list="role_list" id="role" name="role" required value={employee.role} />
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

export { EmployeesTable }