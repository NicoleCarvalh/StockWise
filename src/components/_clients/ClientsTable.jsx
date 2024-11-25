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
import { useContext } from "react"
import { ClientContext } from "@/context/ClientsContextProvider"

// TODO: change to component: Data table 
// TODO: Create an pattern component to tables
function ClientsTable({closeModal = null}) {
    const { clients, setClients, refreshClients } = useContext(ClientContext)

    return (
        <Table>
            <TableCaption>Cadastre novos clientes para agilizar nas compras e enviar promoções por e-mail!</TableCaption>
            <TableHeader className="bg-wise-hyper_black text-wise-light_white">
                <TableRow className="hover:bg-wise-hyper_black">
                    <TableHead className="w-[50px]">
                        <Checkbox />
                    </TableHead>

                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-center">Data de criação</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    clients.map((client, idx) => {
                        return (
                            <TableRow key={idx}>
                                <TableCell>
                                    <Checkbox />
                                </TableCell>

                                <TableCell>{client.name}</TableCell>
                                <TableCell>{client.email}</TableCell>
                                <TableCell className="text-center">{new Date(client.createdAt).toLocaleString()}</TableCell>
                                <TableCell className="flex items-center justify-end gap-5">
                                    <DeleteButton entityName="Cliente" entityDeleted={client.id} databaseEntity="client" callBackAfterDelete={() => closeModal && closeModal()} />
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    )
}

export { ClientsTable }