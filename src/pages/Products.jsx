import { CreateProduct } from "@/components/_products/CreateProduct"
import { ProductsTable } from "@/components/_products/ProductsTable"
import { MainContainer } from "@/components/MainContainer"
import { QRCodeScanner } from "@/components/QRCodeScanner"
import { TopMenu } from "@/components/TopMenu"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowUpNarrowWide, Filter, PackagePlus, PackageSearch, ScanBarcode, ScanQrCode } from "lucide-react"

function Products() {

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

                            <DialogContent className="montserrat overflow-x-hidden" aria-describedby={undefined}>
                                <DialogHeader>
                                    <DialogTitle className="text-lg font-semibold border-b-2 border-wise-dark_green py-3">
                                        Cadastro de produto
                                    </DialogTitle>
                                </DialogHeader>
                                <CreateProduct />
                            </DialogContent>
                        </Dialog>
                    </div>
                </section>

                <section className='flex gap-x-4 items-center justify-between flex-wrap'>
                    <div className='flex gap-x-8 items-center flex-wrap'>
                        <QRCodeScanner />                        
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
            </MainContainer>
        </>
    )
}

export { Products }