import { Plus } from "lucide-react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"

const containers = [
    {
        name: "Nome do container",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam modi vitae autem deleniti ipsam. Maiores pariatur fugiat.",
        place: "Local x",
        code: "HGD9-22F",
        categories: [
            "Camisas",
            "Marcas: ...",
            "Tamanho: M",
            "Modelo: ..."
        ],
        products: [
            {
                name: "Produto X"
            },
            {
                name: "Produto Y"
            },
            {
                name: "Produto S"
            }
        ]
    },
    {
        name: "Nome do container",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam modi vitae autem deleniti ipsam. Maiores pariatur fugiat.",
        place: "Local x",
        code: "HGD9-22F",
        categories: [
            "Camisas",
            "Marcas: ...",
            "Tamanho: M",
            "Modelo: ..."
        ],
        products: [
            {
                name: "Produto X"
            },
            {
                name: "Produto Y"
            },
            {
                name: "Produto S"
            }
        ]
    },
    {
        name: "Nome do container",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam modi vitae autem deleniti ipsam. Maiores pariatur fugiat.",
        place: "Local x",
        code: "HGD9-22F",
        categories: [
            "Camisas",
            "Marcas: ...",
            "Tamanho: M",
            "Modelo: ..."
        ],
        products: [
            {
                name: "Produto X"
            },
            {
                name: "Produto Y"
            },
            {
                name: "Produto S"
            }
        ]
    },
    {
        name: "Nome do container",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam modi vitae autem deleniti ipsam. Maiores pariatur fugiat.",
        place: "Local x",
        code: "HGD9-22F",
        categories: [
            "Camisas",
            "Marcas: ...",
            "Tamanho: M",
            "Modelo: ..."
        ],
        products: [
            {
                name: "Produto X"
            },
            {
                name: "Produto Y"
            },
            {
                name: "Produto S"
            }
        ]
    },
    {
        name: "Nome do container",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam modi vitae autem deleniti ipsam. Maiores pariatur fugiat.",
        place: "Local x",
        code: "HGD9-22F",
        categories: [
            "Camisas",
            "Marcas: ...",
            "Tamanho: M",
            "Modelo: ..."
        ],
        products: [
            {
                name: "Produto X"
            },
            {
                name: "Produto Y"
            },
            {
                name: "Produto S"
            }
        ]
    },
    {
        name: "Nome do container",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam modi vitae autem deleniti ipsam. Maiores pariatur fugiat.",
        place: "Local x",
        code: "HGD9-22F",
        categories: [
            "Camisas",
            "Marcas: ...",
            "Tamanho: M",
            "Modelo: ..."
        ],
        products: [
            {
                name: "Produto X"
            },
            {
                name: "Produto Y"
            },
            {
                name: "Produto S"
            }
        ]
    },
    {
        name: "Nome do container",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam modi vitae autem deleniti ipsam. Maiores pariatur fugiat.",
        place: "Local x",
        code: "HGD9-22F",
        categories: [
            "Camisas",
            "Marcas: ...",
            "Tamanho: M",
            "Modelo: ..."
        ],
        products: [
            {
                name: "Produto X"
            },
            {
                name: "Produto Y"
            },
            {
                name: "Produto S"
            }
        ]
    },
]

export function ContainerList() {


    return (
        <>
            {
                containers.map((container, containerIDX) => (
                    <Dialog key={containerIDX}>
                        <DialogTrigger asChild>
                            <div className="bg-wise-hyper_white rounded-lg p-5 cursor-pointer">
                                <div>
                                    <h2 className="text-xl w-full flex justify-between items-center font-semibold">
                                        {container.name}
                                        <span className="text-wise-dark_green text-sm">{container.code}</span>
                                    </h2>
                                    <p className="text-sm font-light">{container.description}</p>
                                </div>

                                <div className="flex flex-wrap gap-4 justify-between">
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-wise-dark_green">Local</h3>
                                        <p>{container.place}</p>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-wise-dark_green">Categorias</h3>
                                        <ul className="columns-2">
                                            {
                                                container.categories.map((category, idx) => (
                                                    <li key={idx}>{category}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div> 
                        </DialogTrigger>

                        <DialogContent className="min-w-[80%]" aria-describedby={undefined}>
                            <DialogHeader>
                                <DialogTitle className="font-semibold flex justify-between py-5 border-b-2 border-b-wise-dark_green">
                                    {container.name}
                                    <span className="text-wise-dark_green text-base">{container.code}</span>
                                </DialogTitle>                                
                            </DialogHeader>

                            <form action="" method="" className="flex flex-col gap-2">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="name">Nome do container</Label>

                                    <Input id="name" name="name" defaultValue={container.name} />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="description">Descrição</Label>

                                    <Textarea id="description" name="description" defaultValue={container.description} className="resize-none min-h-28" />
                                </div>

                                <div className="flex flex-col gap-2 flex-1 mb-4">
                                    <Label htmlFor="description">Categorias</Label>

                                    <Button type="button" variant="outline">
                                        <Plus size={20} />
                                        Adiconar categoria
                                    </Button>

                                    <div>
                                        {
                                            container.categories.map((category, categoryIDX) => (
                                                <div key={categoryIDX}>
                                                    {category}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="place">Lugar físico do container</Label>

                                    <Input id="place" name="place" defaultValue={container.place} />
                                </div>

                                <div className="flex flex-col gap-2 flex-1 mb-4">
                                    <h4 className="text-base font-semibold border-b-2 border-wise-dark_green py-3">Produtos</h4>

                                    <Button type="button" variant="outline">
                                        <Plus size={20} />
                                        Adiconar produto
                                    </Button>

                                    <div>
                                        {
                                            container.products.map((product, productIDX) => (
                                                <div key={productIDX}>
                                                    {product.name}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>

                                <div className="flex-1 flex gap-2 flex-wrap">
                                    <Button type="submit" className="flex-1 flex items-center justify-center">Atualizar container</Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                    
                ))
            }
        </>
    )
}