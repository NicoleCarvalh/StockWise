import { MainContainer } from "@/components/MainContainer"
import { TopMenu } from "@/components/TopMenu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function Profile() {
    return (
        <>
            <TopMenu />

            <MainContainer className='flex flex-col gap-5 montserrat'>
                <section className="flex flex-col gap-8">
                    <h1 className='text-2xl font-bold'>Perfil</h1>

                    <div className='flex gap-4 flex-wrap justify-center w-full min-h-300px bg-wise-hyper_black rounded-lg p-4'>
                        <img src='/default_profile_image.jpg' alt="Foto de perfil" className="max-w-[150px] flex-1 rounded-md object-cover border-none" />

                        <div className="border border-red-500 flex-1 flex justify-between gap-5 flex-wrap montserrat">
                            <div className='text-wise-light_white'>
                                <h2 className="font-semibold text-2xl">Nome do usuário</h2>
                                <p><span className="text-base text-wise-hyper_light_green">Cargo</span> | Empresa do usuário</p>
                            </div>

                            <div className='flex gap-4 flex-wrap justify-center'>
                                <Label className='text-wise-light_white flex flex-col gap-2'>
                                    Email

                                    <Input disabled value='email.usuario@gmai.com' className='w-full max-w-[300px] min-w-[250px] text-wise-hyper_light_green bg-transparent opacity-100' />
                                </Label>

                                <Label className='text-wise-light_white flex flex-col gap-2'>
                                    Senha

                                    <Input disabled value='senhadousuario' className='w-full max-w-[300px] min-w-[250px] text-wise-hyper_light_green bg-transparent opacity-100' />
                                </Label>
                            </div>

                            <div className="w-full flex justify-between items-end text-wise-light_white">
                                <small>No sistema desde: <span className="text-wise-hyper_light_green">12/05/2024</span></small>

                                <div className="flex gap-2 items-center">
                                    <Button variant='outline'>Sair do sistema</Button>
                                    <Button >Editar informações</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="flex flex-col gap-8">
                    <h1 className='text-2xl font-bold'>Últimas notificações</h1>

                    <div className=''>
                        <ul>
                            <li className="flex justify-between flex-wrap items-center gap-3 py-3 border-b border-b-wise-dark_green last:border-none">
                                <div>
                                    <h2 className="font-semibold">Nome da notificação - HH:MM</h2>
                                    <p className="text-sm">Descrição da notificação</p>
                                </div>

                                <Button variant='outline' className="border-wise-dark_green text-wise-dark_green">Marcar como visualizada</Button>
                            </li>

                            <li className="flex justify-between flex-wrap items-center gap-3 py-3 border-b border-b-wise-dark_green last:border-none">
                                <div>
                                    <h2 className="font-semibold">Nome da notificação - HH:MM</h2>
                                    <p className="text-sm">Descrição da notificação</p>
                                </div>

                                <Button variant='outline' className="border-wise-dark_green text-wise-dark_green">Marcar como visualizada</Button>
                            </li>
                        </ul>
                    </div>
                </section>
            </MainContainer>
        </>
    )
}

export { Profile }