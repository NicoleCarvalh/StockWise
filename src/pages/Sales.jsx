import { MainContainer } from "@/components/MainContainer"
import { TopMenu } from "@/components/TopMenu"
import { CreateSale } from "@/components/_sales/CreateSale"
import { SalesTable } from "@/components/_sales/SalesTable"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScanSearch, ShoppingCart } from "lucide-react"
import { useRef } from "react"

function Sales() {
    const createSaleRef = useRef()

    return (
        <>
            <TopMenu />
            
            <MainContainer className='flex flex-col gap-5 montserrat'>
                <section className="flex gap-3 justify-between items-center flex-wrap">
                    <h1 className='text-2xl font-bold'>Todas as vendas</h1>

                    <div className='flex gap-4 flex-wrap justify-center'>
                        <Label className='flex gap-1 items-center h-[40px] w-fit flex-1'>
                            <Input className='w-full max-w-[230px] min-w-[150px] bg-transparent h-full' placeholder='Procurar vendas...' />
                            
                            <Button className='h-full'>
                                <ScanSearch />
                            </Button>
                        </Label>


                        <Dialog>
                            <DialogTrigger asChild ref={createSaleRef}>
                                <Button className='flex-1 flex gap-3 items-center bg-wise-hyper_black text-wise-hyper_light_green h-[40px] hover:bg-wise-hyper_black hover:text-wise-light_white transition-all'>
                                    <ShoppingCart />
                                    Cadastrar nova venda
                                </Button>
                            </DialogTrigger>


                            <DialogContent className="montserrat">
                                <DialogHeader>
                                    <DialogTitle className="text-lg font-semibold border-b-2 border-wise-dark_green py-3">
                                        Cadastro de venda
                                    </DialogTitle>

                                    <DialogDescription>
                                        Cadastre uma nova venda e acompanhe todo o fluxo do seu estoque com as melhores funcionalidades para inpulsionar as suas vendas!
                                    </DialogDescription>
                                </DialogHeader>

                                <CreateSale callAfterCreate={() => createSaleRef.current.click()}/>
                            </DialogContent>
                        </Dialog>
                    </div>
                </section>

                <section>
                    {/* Create an pattern component to tables */}
                    <SalesTable />
                </section>
            </MainContainer>
        </>
    )
}

export { Sales }