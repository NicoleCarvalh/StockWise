import { MainContainer } from "@/components/MainContainer"
import { TopMenu } from "@/components/TopMenu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Info, PackagePlus, PackageSearch } from "lucide-react"

function VirtualStock() {
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

                        <Button className='flex-1 flex gap-3 items-center bg-wise-hyper_black text-wise-hyper_light_green h-[40px] hover:bg-wise-hyper_black hover:text-wise-light_white transition-all'>
                            <PackagePlus />
                            Cadastrar novo container
                        </Button>
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

                <section className="flex flex-wrap gap-3">
                    <div className="max-w-[450px] bg-wise-hyper_white rounded-lg p-5 cursor-pointer">
                        <div>
                            <h2 className="text-xl w-full flex justify-between items-center font-semibold">
                                Nome do container
                                <span className="text-wise-dark_green text-sm">XHRF-65</span>
                            </h2>
                            <p className="text-sm font-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam modi vitae autem deleniti ipsam. Maiores pariatur fugiat.</p>
                        </div>

                        <div className="flex flex-wrap gap-4 justify-between">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-wise-dark_green">Local</h3>
                                <p>Local x</p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <h3 className="text-wise-dark_green">Categorias</h3>
                                <ul className="columns-2">
                                    <li>Camisas</li>
                                    <li>Marcas: ...</li>
                                    <li>Tamanho: M</li>
                                    <li>Modelo: ...</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-[450px] bg-wise-hyper_white rounded-lg p-5 cursor-pointer">
                        <div>
                            <h2 className="text-xl w-full flex justify-between items-center font-semibold">
                                Nome do container
                                <span className="text-wise-dark_green text-sm">XHRF-65</span>
                            </h2>
                            <p className="text-sm font-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam modi vitae autem deleniti ipsam. Maiores pariatur fugiat.</p>
                        </div>

                        <div className="flex flex-wrap gap-4 justify-between">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-wise-dark_green">Local</h3>
                                <p>Local x</p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <h3 className="text-wise-dark_green">Categorias</h3>
                                <ul className="columns-2">
                                    <li>Camisas</li>
                                    <li>Marcas: ...</li>
                                    <li>Tamanho: M</li>
                                    <li>Modelo: ...</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-[450px] bg-wise-hyper_white rounded-lg p-5 cursor-pointer">
                        <div>
                            <h2 className="text-xl w-full flex justify-between items-center font-semibold">
                                Nome do container
                                <span className="text-wise-dark_green text-sm">XHRF-65</span>
                            </h2>
                            <p className="text-sm font-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam modi vitae autem deleniti ipsam. Maiores pariatur fugiat.</p>
                        </div>

                        <div className="flex flex-wrap gap-4 justify-between">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-wise-dark_green">Local</h3>
                                <p>Local x</p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <h3 className="text-wise-dark_green">Categorias</h3>
                                <ul className="columns-2">
                                    <li>Camisas</li>
                                    <li>Marcas: ...</li>
                                    <li>Tamanho: M</li>
                                    <li>Modelo: ...</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-[450px] bg-wise-hyper_white rounded-lg p-5 cursor-pointer">
                        <div>
                            <h2 className="text-xl w-full flex justify-between items-center font-semibold">
                                Nome do container
                                <span className="text-wise-dark_green text-sm">XHRF-65</span>
                            </h2>
                            <p className="text-sm font-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam modi vitae autem deleniti ipsam. Maiores pariatur fugiat.</p>
                        </div>

                        <div className="flex flex-wrap gap-4 justify-between">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-wise-dark_green">Local</h3>
                                <p>Local x</p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <h3 className="text-wise-dark_green">Categorias</h3>
                                <ul className="columns-2">
                                    <li>Camisas</li>
                                    <li>Marcas: ...</li>
                                    <li>Tamanho: M</li>
                                    <li>Modelo: ...</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-[450px] bg-wise-hyper_white rounded-lg p-5 cursor-pointer">
                        <div>
                            <h2 className="text-xl w-full flex justify-between items-center font-semibold">
                                Nome do container
                                <span className="text-wise-dark_green text-sm">XHRF-65</span>
                            </h2>
                            <p className="text-sm font-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam modi vitae autem deleniti ipsam. Maiores pariatur fugiat.</p>
                        </div>

                        <div className="flex flex-wrap gap-4 justify-between">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-wise-dark_green">Local</h3>
                                <p>Local x</p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <h3 className="text-wise-dark_green">Categorias</h3>
                                <ul className="columns-2">
                                    <li>Camisas</li>
                                    <li>Marcas: ...</li>
                                    <li>Tamanho: M</li>
                                    <li>Modelo: ...</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-[450px] bg-wise-hyper_white rounded-lg p-5 cursor-pointer">
                        <div>
                            <h2 className="text-xl w-full flex justify-between items-center font-semibold">
                                Nome do container
                                <span className="text-wise-dark_green text-sm">XHRF-65</span>
                            </h2>
                            <p className="text-sm font-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam modi vitae autem deleniti ipsam. Maiores pariatur fugiat.</p>
                        </div>

                        <div className="flex flex-wrap gap-4 justify-between">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-wise-dark_green">Local</h3>
                                <p>Local x</p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <h3 className="text-wise-dark_green">Categorias</h3>
                                <ul className="columns-2">
                                    <li>Camisas</li>
                                    <li>Marcas: ...</li>
                                    <li>Tamanho: M</li>
                                    <li>Modelo: ...</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-[450px] bg-wise-hyper_white rounded-lg p-5 cursor-pointer">
                        <div>
                            <h2 className="text-xl w-full flex justify-between items-center font-semibold">
                                Nome do container
                                <span className="text-wise-dark_green text-sm">XHRF-65</span>
                            </h2>
                            <p className="text-sm font-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam modi vitae autem deleniti ipsam. Maiores pariatur fugiat.</p>
                        </div>

                        <div className="flex flex-wrap gap-4 justify-between">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-wise-dark_green">Local</h3>
                                <p>Local x</p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <h3 className="text-wise-dark_green">Categorias</h3>
                                <ul className="columns-2">
                                    <li>Camisas</li>
                                    <li>Marcas: ...</li>
                                    <li>Tamanho: M</li>
                                    <li>Modelo: ...</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </MainContainer>
        </>
    )
}

export { VirtualStock }