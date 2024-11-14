import { Package2 } from "lucide-react"

function ShortTable({type, list}) {
    return (
        <div className="bg-wise-hyper_white rounded-lg p-4 flex flex-col gap-4 montserrat flex-1 w-full min-w-[200px]">
            {
                type == 'em falta' ? 
                    <h1 className='font-bold text-2xl'>
                        Produtos em <span className='text-wise-dark_green'>falta</span>
                    </h1>
                    : 
                    <h1 className='font-bold text-2xl'>
                        Produtos com <span className='text-wise-dark_green'>baixo estoque</span>
                    </h1>
            }

            <div className="flex flex-col gap-4">
                <ul className='flex w-full justify-between items-center font-medium'>
                    <li>Produto</li>
                    <li>Quantidade</li>
                </ul>


                <ul>
                    {list.map((item, idx) => {
                        return (
                            <li key={idx} className="flex items-center justify-between border-b-2 border-b-wise-dark_green py-4 last:border-none last:pb-0">
                                <div className="flex gap-4 items-center">
                                    <div>
                                        <Package2 />
                                    </div>

                                    <div className="flex flex-col">
                                        <h3 className="font-semibold">
                                            {item.name}
                                        </h3>
                                        <small>
                                            {`Fornecido por: ${item.company.name} - ${item.company.category}`}
                                        </small>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-wise-dark_green">
                                        0
                                    </h3>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export { ShortTable }