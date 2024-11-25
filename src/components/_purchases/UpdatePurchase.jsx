import { useState } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"


function UpdatePurchase({purchase}) {

    const [clientName, setClientName] = useState(purchase?.clientName ?? "")
    const [clientEmail, setClientEmail] = useState(purchase?.clientEmail ?? "")
    const [paymentMethod, setPaymentMethod] = useState(purchase?.paymentMethod ?? "")
    const [total, setTotal] = useState(purchase?.total ?? "")
    const [productsList, setProductsList] = useState(purchase?.products ?? [])

    return (
        <form method="POST" action="" className="flex flex-col gap-2">

            <div className="flex flex-col gap-2">
                <Label htmlFor="name">
                    Nome do cliente
                </Label>

                <Input className="disabled:text-wise-hyper_black disabled:opacity-1" id="name" disabled value={clientName} onChange={(ev) => setClientName} />
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="email">
                    E-mail do cliente
                </Label>

                <Input className="disabled:text-wise-hyper_black disabled:opacity-1" id="email" type="email" disabled value={clientEmail} onChange={(ev) => setClientEmail} />
            </div>

            <div className="flex flex-col gap-2 flex-1">
                <Label htmlFor="paymentMethod">
                    Forma de pagamento
                </Label>

                <Input className="disabled:text-wise-hyper_black disabled:opacity-1" id="paymentMethod" type="text" disabled value={paymentMethod} onChange={(ev) => setPaymentMethod} />
            </div>

            <div className="flex flex-col gap-2 flex-1">
                <Label htmlFor="total">
                    Valor total da compra
                </Label>

                <Input className="disabled:text-wise-hyper_black disabled:opacity-1" type="number" id="total" name="total" disabled value={total} onChange={(ev) => setTotal} />
            </div>

            <div className="flex flex-col gap-2 my-4">
                <h3 className="font-semibold border-wise-dark_red">Produtos comprados</h3>

                <ul>
                    {
                    (productsList && productsList.length > 0) ? productsList.map((prod, idx) => (
                        <li key={prod?.code+idx} className="flex justify-between gap-2 items-center py-2 border-b border-b-wise-hyper_black">
                            <div className="flex flex-col gap-1">
                                <h4 className="text-base font-semibold">{prod?.name}</h4>
                                <p className="text-sm">Código do produto: {prod?.code}</p>
                            </div>

                            <div className="flex flex-col items-end gap-1">
                                <h4>Quantidade</h4>
                                <p>{Math.round(Math.random() * 1)}</p>
                            </div>
                        </li>
                    )) : <i>Nenhum produto adicionado ainda...</i>
                    }
                </ul>
            </div>
        </form>
    )
}

export { UpdatePurchase }