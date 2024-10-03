import { MainContainer } from "@/components/MainContainer"
import { TopMenu } from "@/components/TopMenu"
import { EmployeesTable } from "@/components/_employees/EmployeesTable"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserPlus2, UserRoundSearch } from "lucide-react"

function Employees() {
    return (
        <>
            <TopMenu />
            <MainContainer className='flex flex-col gap-5 montserrat'>
                <section className="flex gap-3 justify-between items-center flex-wrap">
                    <h1 className='text-2xl font-bold'>Todos os funcionários</h1>

                    <div className='flex gap-4 flex-wrap justify-center'>
                        <Label className='flex gap-1 items-center h-[40px] w-fit flex-1'>
                            <Input className='w-full max-w-[230px] min-w-[150px] bg-transparent h-full' placeholder='Procurar funcionário...' />
                            
                            <Button className='h-full'>
                                <UserRoundSearch />
                            </Button>
                        </Label>

                        <Button className='flex-1 flex gap-3 items-center bg-wise-hyper_black text-wise-hyper_light_green h-[40px] hover:bg-wise-hyper_black hover:text-wise-light_white transition-all'>
                            <UserPlus2 />
                            Cadastrar novo funcionário
                        </Button>
                    </div>
                </section>

                <section>
                    <EmployeesTable />
                </section>
            </MainContainer>
        </>
    )
}

export { Employees }