import { CreateProduct } from "@/components/_products/CreateProduct"
import { ProductsTable } from "@/components/_products/ProductsTable"
import { UpdateProduct } from "@/components/_products/UpdateProduct"
import { MainContainer } from "@/components/MainContainer"
import { QRCodeScanner } from "@/components/QRCodeScanner"
import { TopMenu } from "@/components/TopMenu"
import { Button } from "@/components/ui/button"
import { ChatTab } from "@/components/_stockwizard/ChatTab"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowUpNarrowWide, Filter, PackagePlus, PackageSearch, ScanBarcode, ScanQrCode } from "lucide-react"
import { useState } from "react"

function Products() {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [foundProduct, setFoundProduct] = useState(null)

    return (
        <>
            <TopMenu />

            <MainContainer className='flex flex-col gap-5 montserrat'>
                <section className="flex gap-3 justify-between items-center flex-wrap">
                    <h1 className='text-2xl font-bold'>Todos os produtos</h1>

                    <div className='flex gap-4 flex-wrap justify-center'>
                        <Label className='flex gap-1 items-center h-[40px] w-fit flex-1'>
                            <Input className='w-full max-w-[230px] min-w-[150px] bg-transparent h-full' placeholder='Procurar produtos...' />
                            
                            <Button className='h-full'>
                                <PackageSearch />
                            </Button>
                        </Label>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className='flex-1 flex gap-3 items-center bg-wise-hyper_black text-wise-hyper_light_green h-[40px] hover:bg-wise-hyper_black hover:text-wise-light_white transition-all'>
                                    <PackagePlus />
                                    Cadastrar novo produto
                                </Button>
                            </DialogTrigger>

                            <DialogContent className="montserrat overflow-x-hidden max-w-[90%] md:max-w-[60%]">
                                <DialogHeader>
                                    <DialogTitle className="text-lg font-semibold border-b-2 border-wise-dark_green py-3">
                                        Cadastro de produto
                                    </DialogTitle>

                                    <DialogDescription>
                                        Cadastre novos produtos e controle o seu estoque com a poucos clicks.
                                    </DialogDescription>
                                </DialogHeader>
                                
                                <CreateProduct />
                            </DialogContent>
                        </Dialog>
                    </div>
                </section>

                <section className='flex gap-x-4 items-center justify-between flex-wrap'>
                    <div className='flex gap-x-8 items-center flex-wrap'>
                        <QRCodeScanner callAfterFound={(product) => {setFoundProduct(product); setModalIsOpen(true)}} />

                        <Dialog open={modalIsOpen} onOpenChange={(open) => setModalIsOpen(open)}>
                            <DialogContent className="max-w-[90%] md:max-w-[60%]">
                                <DialogHeader>
                                    <DialogTitle className="text-lg font-semibold border-b-2 border-wise-dark_green py-3">{foundProduct && foundProduct.name}</DialogTitle>
                                    <DialogDescription>
                                        Visualize e edite as informações do produto como desejar.
                                    </DialogDescription>
                                </DialogHeader>

                                <UpdateProduct product={foundProduct} />
                            </DialogContent>
                        </Dialog>                      
                    </div>

                    <div className='flex gap-x-8 items-center flex-wrap'>
                        <Button className="flex items-center gap-2 bg-transparent text-wise-hyper_black p-0 hover:text-wise-light_white hover:p-2 transition-all">
                            <Filter />
                            Filtrar
                        </Button>

                        <Button className="flex items-center gap-2 bg-transparent text-wise-hyper_black p-0 hover:text-wise-light_white hover:p-2 transition-all">
                            <ArrowUpNarrowWide />
                            Ordenar
                        </Button>
                    </div>
                </section>

                <section>
                    {/* Create an pattern component to tables */}
                    <ProductsTable />
                </section>
                <ChatTab/>
            </MainContainer>
        </>
    )
}

export { Products }