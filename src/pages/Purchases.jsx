import { MainContainer } from "@/components/MainContainer"
import { TopMenu } from "@/components/TopMenu"
import { CreatePurchase } from "@/components/_purchases/CreatePurchase"
import { PurchasesTable } from "@/components/_purchases/PurchasesTable"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PackageSearch, ScanSearch, ShoppingCart } from "lucide-react"

function Purchases() {
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

                        <Dialog>
                            <DialogTrigger>
                                <Button className='flex-1 flex gap-3 items-center bg-wise-hyper_black text-wise-hyper_light_green h-[40px] hover:bg-wise-hyper_black hover:text-wise-light_white transition-all'>
                                    <ShoppingCart />
                                    Cadastrar nova compra
                                </Button>
                            </DialogTrigger>


                            <DialogContent className="montserrat">
                                <DialogHeader>
                                    <DialogTitle className="text-lg font-semibold border-b-2 border-wise-dark_green py-3">
                                        Cadastro de compra
                                    </DialogTitle>
                                </DialogHeader>

                                <CreatePurchase />
                            </DialogContent>
                        </Dialog>
                    </div>
                </section>

                <section>
                    <PurchasesTable />
                </section>
            </MainContainer>
        </>
    )
}

export { Purchases }