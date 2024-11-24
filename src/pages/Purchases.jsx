import { MainContainer } from "@/components/MainContainer"
import { TopMenu } from "@/components/TopMenu"
import { CreatePurchase } from "@/components/_purchases/CreatePurchase"
import { PurchasesTable } from "@/components/_purchases/PurchaseTable"
import { Button } from "@/components/ui/button"
import { ChatTab } from "@/components/_stockwizard/ChatTab"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useQrScanner } from "@/context/ScannerContextProvider"
import { ScanSearch, ShoppingCart } from "lucide-react"
import { useRef } from "react"

function Purchases() {
    const createPurchaseRef = useRef()
    const { closeQrScanner } = useQrScanner();

    return (
        <>
            <TopMenu />
            
            <MainContainer className='flex flex-col gap-5 montserrat'>
                <section className="flex gap-3 justify-between items-center flex-wrap">
                    <h1 className='text-2xl font-bold'>Todas as compras</h1>

                    <div className='flex gap-4 flex-wrap justify-center'>
                        <Label className='flex gap-1 items-center h-[40px] w-fit flex-1'>
                            <Input className='w-full max-w-[230px] min-w-[150px] bg-transparent h-full' placeholder='Procurar compras...' />
                            
                            <Button className='h-full'>
                                <ScanSearch />
                            </Button>
                        </Label>


                        <Dialog onOpenChange={closeQrScanner}>
                            <DialogTrigger asChild ref={createPurchaseRef}>
                                <Button className='flex-1 flex gap-3 items-center bg-wise-hyper_black text-wise-hyper_light_green h-[40px] hover:bg-wise-hyper_black hover:text-wise-light_white transition-all'>
                                    <ShoppingCart />
                                    Cadastrar nova compra
                                </Button>
                            </DialogTrigger>


                            <DialogContent className="montserrat max-w-[90%] md:max-w-[60%]">
                                <DialogHeader>
                                    <DialogTitle className="text-lg font-semibold border-b-2 border-wise-dark_green py-3">
                                        Cadastro de compra
                                    </DialogTitle>

                                    <DialogDescription>
                                        Cadastre uma nova compra de produtos para controlar de forma automática as entradas de estoque dos seus produtos!
                                    </DialogDescription>
                                </DialogHeader>

                                <CreatePurchase callAfterCreate={() => createPurchaseRef.current.click()}/>
                            </DialogContent>
                        </Dialog>
                    </div>
                </section>

                <section>
                    {/* Create an pattern component to tables */}
                    <PurchasesTable />
                </section>
                <ChatTab/>
            </MainContainer>
        </>
    )
}

export { Purchases }