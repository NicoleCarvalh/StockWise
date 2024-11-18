import { AuthContext } from "@/auth/AuthProvider"
import { MainContainer } from "@/components/MainContainer"
import { TopMenu } from "@/components/TopMenu"
import { InfoCard } from "@/components/_dashboard/InfoCard"
import { ShortTable } from "@/components/_dashboard/ShortTable"
import { ToastAction } from "@/components/ui/toast"
import { ProductsContext } from "@/context/ProductsContextProvider"
import { useToast } from "@/hooks/use-toast"
import { Package2 } from "lucide-react"
import { useContext, useEffect, useState } from "react"

// const missingList = [
//     {
//         name: 'Teclado mecânico Logitech',
//         company: {
//             name: 'Logitech',
//             category: 'Tecnologia e inovação'
//         }
//     },
//     {
//         name: 'Teclado mecânico Logitech',
//         company: {
//             name: 'Logitech',
//             category: 'Tecnologia e inovação'
//         }
//     },
//     {
//         name: 'Teclado mecânico Logitech',
//         company: {
//             name: 'Logitech',
//             category: 'Tecnologia e inovação'
//         }
//     }
// ]

// const endingList = [
//     {
//         name: 'Teclado mecânico Logitech',
//         company: {
//             name: 'Logitech',
//             category: 'Tecnologia e inovação'
//         }
//     },
//     {
//         name: 'Teclado mecânico Logitech',
//         company: {
//             name: 'Logitech',
//             category: 'Tecnologia e inovação'
//         }
//     },
//     {
//         name: 'Teclado mecânico Logitech',
//         company: {
//             name: 'Logitech',
//             category: 'Tecnologia e inovação'
//         }
//     }
// ]

function Dashboard() {
    const { products, setProducts } = useContext(ProductsContext)
    const {credentials} = useContext(AuthContext) 
    const [missingList, setMissingList] = useState([])
    const [endingList, setEndingList] = useState([])
    const [sales, setSales] = useState([])
    const [salesMonth, setSalesMonth] = useState([])
    const [salesYear, setSalesYear] = useState([])
    const [salesDay, setSalesDay] = useState([])
    const { toast } = useToast()

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/product`, {
            headers: {
              "Authorization": `Bearded ${credentials.token}`,
            }
        }).then(json => json.json()).then((data) => {
            if(data?.ERROR) {
                toast({
                    title: "Ocorreu um erro durante as buscas!",
                    variant: "destructive",
                    description: <p>{data?.ERROR} <br/>Tente novamente</p>,
                    action: (
                      <ToastAction altText="Fechar">Fechar</ToastAction>
                    )
                })
        
                return
            }

            setProducts(data)

            const missingProducts = data.filter(product => product.quantityInStock == 0)
            const endingProducts = data.filter(product => product.quantityInStock <= 8 && product.quantityInStock > 0)
    
        
            setMissingList(missingProducts)
            setEndingList(endingProducts)
        }).catch(error => {
            toast({
                title: "Ocorreu um erro durante a busca pelas vendas.",
                variant: "destructive",
                description: <p>{error?.message} <br/>Tente novamente</p>,
                action: (
                  <ToastAction altText="Fechar">Fechar</ToastAction>
                )
            })
        })

        fetch(`${import.meta.env.VITE_API_BASE_URL}/transaction`, {
            headers: {
              "Authorization": `Bearded ${credentials.token}`,
            }
        }).then(json => json.json()).then((data) => {
            if(data?.ERROR) {
                toast({
                    title: "Ocorreu um erro durante as buscas!",
                    variant: "destructive",
                    description: <p>{data?.ERROR} <br/>Tente novamente</p>,
                    action: (
                      <ToastAction altText="Fechar">Fechar</ToastAction>
                    )
                })
        
                return
            }

            const salesOfMonth = data.filter(sale => {
                const saleMonth = new Date(sale.createdAt).getMonth()
                const currentMonth = new Date().getMonth()
                
                if(saleMonth == currentMonth) {
                    return sale
                }
            })
            setSalesMonth(salesOfMonth)

            const salesOfYear = data.filter(sale => {
                const saleYear = new Date(sale.createdAt).getFullYear()
                const currentYear = new Date().getFullYear()
                
                if(saleYear == currentYear) {
                    return sale
                }
            })
            setSalesYear(salesOfYear)

            const salesOfDay = data.filter(sale => {
                const saleDay = new Date(sale.createdAt).getDate()
                const currentDay = new Date().getDate()
                
                if(saleDay == currentDay) {
                    return sale
                }
            })
            setSalesDay(salesOfDay)


            setSales(data)
            // console.log(data)

            // const missingProducts = data.filter(product => product.quantityInStock == 0)
            // const endingProducts = data.filter(product => product.quantityInStock <= 8 && product.quantityInStock > 0)
    
        
            // setMissingList(missingProducts)
            // setEndingList(endingProducts)
        }).catch(error => {
            toast({
                title: "Ocorreu um erro durante a busca pelas vendas.",
                variant: "destructive",
                description: <p>{error?.message} <br/>Tente novamente</p>,
                action: (
                  <ToastAction altText="Fechar">Fechar</ToastAction>
                )
            })
        })

    }, [])


    return (
        <>
            <TopMenu />

            <MainContainer className='flex flex-col gap-5 montserrat'>

                <section>
                    <h1 className='text-2xl font-bold mb-4'>Resumo</h1>

                    <div className='flex flex-col gap-5'>
                        <div className="flex gap-2 flex-wrap">
                            <InfoCard title='Total de vendas em 2024' value={salesYear?.length ?? "--"} analysis='Calculando estatísticas...' />
                            <InfoCard icon={<Package2 />} title='Total de produtos cadastrados' value={products.length ?? "--"} analysis='Calculando estatísticas...' />
                            <InfoCard title='Total de vendas nesse mês' value={salesMonth?.length ?? "--"} analysis='Calculando estatísticas...' />
                            <InfoCard title='Total de vendas hoje' value={salesDay?.length ?? "--"} analysis='Calculando estatísticas...' />
                        </div>

                        <div className='flex gap-2 flex-wrap'>
                            <ShortTable type='missing' list={missingList} />
                            <ShortTable list={endingList} />
                        </div>
                    </div>
                </section>

                <section>
                    <h1 className='text-2xl font-bold mb-4'>Análise gráfica</h1>

                    <section className='flex gap-2 flex-wrap'>

                        {/* Grafico 1 */}
                        

                        {/* Grafico 2 */}
                        

                    </section>
                </section>
            </MainContainer>
        </>
    )
}

export { Dashboard }