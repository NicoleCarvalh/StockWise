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
import { Expand, QrCode } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { DeleteButton } from "../DeleteButton"
import QRCode from 'qrcode';
import { useState } from "react"

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
        code: 'GTD79',
        category: 'Eletrônico'
    },
    {
        name: 'Fone de ouvido JBL - TUNET 510',
        stock: 120,
        code: '2R47Ç',
        category: 'Eletrônico'
    },
    {
        name: 'Fone de ouvido JBL - TUNET 510',
        stock: 120,
        code: '43DGE',
        category: 'Eletrônico'
    },
    {
        name: 'Fone de ouvido JBL - TUNET 510',
        stock: 120,
        code: 'EE224',
        category: 'Eletrônico'
    },
    {
        name: 'Fone de ouvido JBL - TUNET 510',
        stock: 120,
        code: '86GE22',
        category: 'Eletrônico'
    },
    {
        name: 'Fone de ouvido JBL - TUNET 510',
        stock: 120,
        code: 'HHJJ23',
        category: 'Eletrônico'
    },
    {
        name: 'Fone de ouvido JBL - TUNET 510',
        stock: 120,
        code: 'T4E-6F',
        category: 'Eletrônico'
    },
    {
        name: 'Fone de ouvido JBL - TUNET 510',
        stock: 120,
        code: '3DF45',
        category: 'Eletrônico'
    },
    {
        name: 'Fone de ouvido JBL - TUNET 510',
        stock: 120,
        code: '3E3TG',
        category: 'Eletrônico'
    },
    {
        name: 'Fone de ouvido JBL - TUNET 510',
        stock: 120,
        code: '64DF5',
        category: 'Eletrônico'
    },
    {
        name: 'Fone de ouvido JBL - TUNET 510',
        stock: 120,
        code: '43FF5',
        category: 'Eletrônico'
    },
    {
        name: 'Fone de ouvido JBL - TUNET 510',
        stock: 120,
        code: '3235T',
        category: 'Eletrônico'
    },
]

// TODO: change to component: Data table 
// TODO: Create an pattern component to tables
function ProductsTable() {
    const [qrCodeUrl, setQrCodeUrl] = useState("#");

    function generateQRCode(id) {
        QRCode.toDataURL(id, {
          width: 100,
          margin: 2,
          color: {
            dark: "#00cc74"
          }
        }, (err, url) => {
          if (err) {
            console.error(err);
            // Exibir uma mensagem de erro ao usuário
          } else {
            setQrCodeUrl(url);
          }
        });
    }


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
                                    <div className="relative group">
                                        <QrCode className="cursor-pointer" onMouseOver={() => generateQRCode(product.code)} />
                                        <img id="qrcode" alt="QR Code" src={qrCodeUrl} className="hidden group-hover:block min-w-[50px] shadow-lg  rounded-md absolute left-[-50%] bottom-[100%]" />  
                                    </div>

                                    <DeleteButton entityName="Produto" entityDeleted={product.name} />

                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Expand className="cursor-pointer" />
                                        </DialogTrigger>

                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle className="text-lg font-semibold border-b-2 border-wise-dark_green py-3">{product.name}</DialogTitle>
                                            </DialogHeader>

                                            <form method="" action="" className="flex flex-col gap-2">

                                                <div className="flex flex-col gap-2">
                                                    <Label htmlFor="name">
                                                        Nome
                                                    </Label>

                                                    <Input id="name" required value={product.name} />
                                                </div>

                                                <div className="flex gap-2">
                                                    <div className="flex flex-col gap-2 w-full">
                                                        <Label htmlFor="photo">
                                                            Foto
                                                        </Label>

                                                        <Input type="file" id="photo" name="photo" onChange={(ev) => handlePhotoPreview(idx, ev)}  />
                                                    </div>

                                                    {
                                                        product.photo_url && (
                                                        <div className="max-h-full h-full flex-1 flex items-center justify-end">
                                                            <img src={product.photo_url} alt="" className="h-full max-w-[80px] object-cover rounded-sm" />
                                                        </div>
                                                        )
                                                    }
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <Label htmlFor="email">
                                                        E-mail
                                                    </Label>

                                                    <Input id="email" type="email" required value={product.email} />
                                                </div>

                                                <div className="flex flex-col gap-2 flex-1">
                                                    <Label htmlFor="password">
                                                        Senha
                                                    </Label>

                                                    <Input id="password" type="password" required value={product.password} />
                                                </div>

                                                <div className="flex flex-col gap-2 flex-1">
                                                    <Label htmlFor="role">
                                                        Cargo
                                                    </Label>

                                                    <Input list="role_list" id="role" name="role" required value={product.role} />
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

export { ProductsTable }