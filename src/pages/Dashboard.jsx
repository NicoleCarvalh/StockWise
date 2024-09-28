import { MainContainer } from "@/components/MainContainer"
import { TopMenu } from "@/components/TopMenu"
import { InfoCard } from "@/components/_dashboard/InfoCard"
import { ShortTable } from "@/components/_dashboard/ShortTable"
import { Package2 } from "lucide-react"

const missingList = [
    {
        name: 'Teclado mecânico Logitech',
        company: {
            name: 'Logitech',
            category: 'Tecnologia e inovação'
        }
    },
    {
        name: 'Teclado mecânico Logitech',
        company: {
            name: 'Logitech',
            category: 'Tecnologia e inovação'
        }
    },
    {
        name: 'Teclado mecânico Logitech',
        company: {
            name: 'Logitech',
            category: 'Tecnologia e inovação'
        }
    }
]

const endingList = [
    {
        name: 'Teclado mecânico Logitech',
        company: {
            name: 'Logitech',
            category: 'Tecnologia e inovação'
        }
    },
    {
        name: 'Teclado mecânico Logitech',
        company: {
            name: 'Logitech',
            category: 'Tecnologia e inovação'
        }
    },
    {
        name: 'Teclado mecânico Logitech',
        company: {
            name: 'Logitech',
            category: 'Tecnologia e inovação'
        }
    }
]

function Dashboard() {

    return (
        <>
            <TopMenu />

            <MainContainer className='flex flex-col gap-5 montserrat'>

                <section>
                    <h1 className='text-2xl font-bold mb-4'>Resumo</h1>

                    <div className='flex flex-col gap-5'>
                        <div className="flex gap-2 flex-wrap">
                            <InfoCard title='Total de vendas em 2024' value='30.520' analysis='+12% do que em 2023' />
                            <InfoCard icon={<Package2 />} title='Total de produtos em estoque' value='432' analysis='+31 nessa semana' />
                            <InfoCard title='Total de vendas nesse mês' value='3.012' analysis='+12% do que no mês passado' />
                            <InfoCard title='Total de vendas hoje' value='115' analysis='-5% do que ontem' />
                        </div>

                        <div className='flex gap-2 flex-wrap'>
                            <ShortTable type='em falta' list={missingList} />
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