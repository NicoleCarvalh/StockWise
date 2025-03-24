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
import { Barcode as BarcodeLucide, Expand, QrCode } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import { DeleteButton } from "../DeleteButton"
import { useContext, useEffect, useRef, useState } from "react"
import { ProductsContext } from "@/context/ProductsContextProvider"
import { useReactToPrint } from "react-to-print"
import { UpdateProduct } from "./UpdateProduct"
import Barcode from 'react-barcode'
// TODO: change to component: Data table 
// TODO: Create an pattern component to tables
function ProductsTable() {
    const [qrCodeUrl, setQrCodeUrl] = useState("#");
    const qrCodeToPrintRef = useRef(null);
    const { products, setProducts, refreshProducts } = useContext(ProductsContext)
    const printQrCode = useReactToPrint({contentRef: qrCodeToPrintRef})

    useEffect(() => refreshProducts(), [])
    // useEffect(() => {
    //     console.log("AQUI PRODUCTS")
    //     console.log(products)
    //     setProducts(products)
    // }, [products])

    return (
        <Table>
            <TableCaption>Cadastre mais produtos... Venda mais.</TableCaption>
            <TableHeader className="bg-wise-hyper_black text-wise-light_white">
                <TableRow className="hover:bg-wise-hyper_black">
                    <TableHead className="w-[50px]">
                        <Checkbox />
                    </TableHead>

                    <TableHead className="w-[80px]">Foto</TableHead>
                    <TableHead className="min-w-[150px]">Código</TableHead>

                    <TableHead className="max-w-[300px] overflow-x-hidden text-ellipsis">Nome</TableHead>
                    <TableHead className="text-center">Estoque</TableHead>
                    <TableHead className="text-center">Valor de venda</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    (products && products.length > 0) && [...products].reverse().map((product, idx) => {
                        return (
                            <TableRow key={idx}>
                                <TableCell>
                                    <Checkbox />
                                </TableCell>

                                <TableCell>
                                    <img src={product && product?.photoUrl ? product?.photoUrl : '/default_product_image.jpg'} alt={product.name} className="size-[35px] rounded-full object-cover" />
                                </TableCell>
                                <TableCell className="font-medium">{product.code}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell className="text-center">{product.quantityInStock}</TableCell>
                                <TableCell className="text-center">{product.salePrice}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell className="flex items-center justify-end gap-5">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <div className="relative group" onMouseOver={() => setQrCodeUrl(product.trackUrl)}>
                                                <QrCode className="cursor-pointer" />
                                                <img id="qrcode" alt="QR Code" src={qrCodeUrl} className="hidden group-hover:block min-w-[50px] shadow-lg  rounded-md absolute left-[-50%] bottom-[100%]" />  
                                            </div>
                                        </DialogTrigger>

                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle className="text-lg font-semibold border-b-2 border-wise-dark_green py-3">QRCode do produto: {product.name}</DialogTitle>
                                                <DialogDescription>
                                                    Utilize esse QRCode para ver informações dele com seu celular, imprima e cole o QRCode no produto da sua loja para cadastrar novas vendas de forma prática, e muito mais!
                                                </DialogDescription>
                                            </DialogHeader>

                                            <div className="flex flex-col items-center gap-3">
                                                <div className="max-w-[50%] print:max-w-[150px] w-full flex flex-col items-center gap-1" ref={qrCodeToPrintRef}>
                                                    <h2 className="text-xl border-2 border-wise-hyper_black rounded-md w-full p-1 text-center">{product.name} - {product.code}</h2>
                                                    <img id="qrcodeToPrint"  alt="QRCode to print" src={qrCodeUrl} className="group-hover:block w-full shadow-lg rounded-md" />  
                                                </div>

                                                <Button type="button" className="w-full" onClick={() => {
                                                    printQrCode()
                                                }}>Imprimir QRCode</Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                    

                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <div className="relative group" onMouseOver={() => setQrCodeUrl(product.trackUrl)}>
                                                <BarcodeLucide className="cursor-pointer" />
                                                {/* <img id="qrcode" alt="QR Code" src={qrCodeUrl} className="hidden group-hover:block min-w-[50px] shadow-lg  rounded-md absolute left-[-50%] bottom-[100%]" />   */}
                                                {/* <img id="qrcode" alt="QR Code" src={qrCodeUrl} className="hidden group-hover:block min-w-[50px] shadow-lg  rounded-md absolute left-[-50%] bottom-[100%]" />   */}
                                            
                                                <Barcode value={product.code} background="#1f1f1f" lineColor="#00cc74" className="hidden group-hover:block min-w-[50px] max-h-[80px] max-w-[100px] rounded-md absolute left-[-50%] bottom-[100%]" />
                                            </div>
                                        </DialogTrigger>

                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle className="text-lg font-semibold border-b-2 border-wise-dark_green py-3">Código de barras do produto: {product.name}</DialogTitle>
                                                <DialogDescription>
                                                    Utilize esse código de barras para indentificar seus produtos, imprima e cole ele no produto da sua loja para cadastrar novas vendas e compras e muito mais de forma prática!
                                                </DialogDescription>
                                            </DialogHeader>

                                            <div className="flex flex-col items-center gap-3">
                                                <div className="print:max-w-[150px] w-full flex flex-col gap-1">
                                                    <h2 className="text-xl min-w-full p-1">{product.name} - {product.code}</h2>
                                                    {/* <img id="qrcodeToPrint"  alt="QRCode to print" src={qrCodeUrl} className="group-hover:block w-full shadow-lg rounded-md" />   */}
                                                

                                                    <div ref={qrCodeToPrintRef} className="flex justify-center w-full">
                                                        <Barcode id="qrcodeToPrint" value={product.code} background="#1f1f1f" lineColor="#00cc74" className="group-hover:block rounded-md bg-transparent"/>
                                                    </div>
                                                
                                                </div>

                                                <Button type="button" className="w-full" onClick={() => {
                                                    printQrCode()
                                                }}>Imprimir código de barras</Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>


                                    <DeleteButton databaseEntity='product' entityDeleted={product.id} />

                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Expand className="cursor-pointer" />
                                        </DialogTrigger>

                                        <DialogContent className="max-w-[90%] md:max-w-[60%]">
                                            <DialogHeader>
                                                <DialogTitle className="text-lg font-semibold border-b-2 border-wise-dark_green py-3">{product.name}</DialogTitle>
                                                <DialogDescription>
                                                    Visualize e edite as informações do produto como desejar.
                                                </DialogDescription>
                                            </DialogHeader>

                                            <UpdateProduct product={product} />
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