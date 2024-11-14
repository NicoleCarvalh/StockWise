import { ShoppingCart } from "lucide-react"

function InfoCard({title, value, analysis, icon}) {
    return (
        <div className="w-full min-w-[200px] p-4 flex-1 flex flex-col gap-3 justify-between min-h-[150px] rounded-lg bg-wise-hyper_white montserrat">
            <div className="w-full flex justify-end items-center">
                {icon ?? <ShoppingCart />}
            </div>

            <div className="w-full flex justify-between gap-5 items-center font-bold text-xl flex-wrap">
                <h2 className="max-w-[60%]">
                    {title ?? 'TITULO DO CARD'}
                </h2>
                <h3 className="text-wise-dark_green">
                    {value ?? '00.000'}
                </h3>
            </div>

            <div className="flex justify-center items-center">
                <small>
                    {analysis ?? 'ANALISE COMPARATIVA'}
                </small>
            </div>
        </div>
    )
}

export { InfoCard }