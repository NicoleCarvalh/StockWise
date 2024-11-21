import { ContainerList } from "@/components/_virtualStock/ContainerList"
import { CreateContainer } from "@/components/_virtualStock/CreateContainer"
import { MainContainer } from "@/components/MainContainer"
import { TopMenu } from "@/components/TopMenu"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DialogDescription } from "@radix-ui/react-dialog"
import { Info, PackagePlus, PackageSearch } from "lucide-react"
import { useRef } from "react"

function VirtualStock() {
    const createContainerModalRef = useRef()

    return (
        <>
            <TopMenu />

            <MainContainer className='flex flex-col gap-5 montserrat'>
                <section className="flex gap-3 justify-between items-center flex-wrap">
                    <h1 className='text-2xl font-bold flex gap-1 items-center cursor-help' title="Containers são locais onde você pode organizar seus produtos. Imagine um container do sistema como uma caixa onde você guarda seus produtos por categorias, ou prateleiras de supermercado, onde os produtos são organizados por finalidades, como limpeza, molhos, massas..." >
                        Seus containers 

                        <Info size={15} className="text-wise-hyper_light_green"/>
                    </h1>

                    <div className='flex gap-4 flex-wrap justify-center'>
                        <Label className='flex gap-1 items-center h-[40px] w-fit flex-1'>
                            <Input className='w-full max-w-[230px] min-w-[150px] bg-transparent h-full' placeholder='Procurar containers...' />
                            
                            <Button className='h-full'>
                                <PackageSearch />
                            </Button>
                        </Label>


                        <Dialog>
                            <DialogTrigger asChild ref={createContainerModalRef}>
                                <Button className='flex-1 flex gap-3 items-center bg-wise-hyper_black text-wise-hyper_light_green h-[40px] hover:bg-wise-hyper_black hover:text-wise-light_white transition-all'>
                                    <PackagePlus />
                                    Cadastrar novo container
                                </Button>
                            </DialogTrigger>

                            <DialogContent className="montserrat" aria-describedby={undefined}>
                                <DialogHeader>
                                    <DialogTitle className="text-lg font-semibold border-b-2 border-wise-dark_green py-3">
                                        Cadastro de container
                                    </DialogTitle>

                                    <DialogDescription>
                                        A digitalização perfeita dos locais onde você organiza os seus produtos!
                                    </DialogDescription>
                                </DialogHeader>

                                <CreateContainer closeCurrentModal={() => createContainerModalRef?.current.click()} />
                            </DialogContent>
                        </Dialog>
                    </div>
                </section>

                <section className='flex gap-4 items-center justify-center md:justify-normal flex-wrap'>
                    <Select>
                        <SelectTrigger className="max-w-[250px]">
                            <SelectValue placeholder="Cor: selecionar" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="color_1">COR 1</SelectItem>
                            <SelectItem value="color_2">COR 2</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger className="max-w-[250px]">
                            <SelectValue placeholder="Local: selecionar" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="place_1">LOCAL 1</SelectItem>
                            <SelectItem value="place_2">LOCAL 2</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger className="max-w-[250px]">
                            <SelectValue placeholder="Categoria: selecionar" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="CATEGORY_1">CATEGORIA 1</SelectItem>
                            <SelectItem value="CATEGORY_2">CATEGORIA 2</SelectItem>
                        </SelectContent>
                    </Select>
                </section>

                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
                    <ContainerList />
                </section>
            </MainContainer>
        </>
    )
}

export { VirtualStock }