import { MainContainer } from "@/components/MainContainer"
import { TopMenu } from "@/components/TopMenu"
import { CreateClient } from "@/components/_clients/CreateClient"
import { ClientsTable } from "@/components/_clients/ClientsTable"
import { Button } from "@/components/ui/button"
import { ChatTab } from "@/components/_stockwizard/ChatTab"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserPlus2, UserRoundSearch } from "lucide-react"
import { useContext, useEffect, useRef } from "react"
import { ClientContext } from "@/context/ClientsContextProvider"

function Clients() {
    const modalRef = useRef()
    const { clients, setClients, refreshClients } = useContext(ClientContext)

    useEffect(() => {refreshClients()}, [])

    return (
        <>
            <TopMenu />
            <MainContainer className='flex flex-col gap-5 montserrat'>
                <section className="flex gap-3 justify-between items-center flex-wrap">
                    <h1 className='text-2xl font-bold'>Todos os clientes</h1>

                    <div className='flex gap-4 flex-wrap justify-center'>
                        <Label className='flex gap-1 items-center h-[40px] w-fit flex-1'>
                            <Input className='w-full max-w-[230px] min-w-[150px] bg-transparent h-full' placeholder='Procurar cliente...' />
                            
                            <Button className='h-full'>
                                <UserRoundSearch />
                            </Button>
                        </Label>

                        <Dialog>
                            <DialogTrigger asChild ref={modalRef}>
                                <Button className='flex-1 flex gap-3 items-center bg-wise-hyper_black text-wise-hyper_light_green h-[40px] hover:bg-wise-hyper_black hover:text-wise-light_white transition-all'>
                                    <UserPlus2 />
                                    Cadastrar novo cliente
                                </Button>
                            </DialogTrigger>


                            <DialogContent className="montserrat" aria-describedby={undefined}>
                                <DialogHeader>
                                    <DialogTitle className="text-lg font-semibold border-b-2 border-wise-dark_green py-3">
                                        Cadastro de cliente
                                    </DialogTitle>

                                    <DialogDescription>
                                        Cadastre os clientes que estão sempre com você para agilizar o cadastro de novas vendas que eles façam.
                                    </DialogDescription>
                                </DialogHeader>

                                <CreateClient callAfterCreate={() => modalRef.current.click()} />
                            </DialogContent>
                        </Dialog>
                        
                    </div>
                </section>

                <section>
                    <ClientsTable />
                </section>
                <ChatTab/>
            </MainContainer>
        </>
    )
}

export { Clients }