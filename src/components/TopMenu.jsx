import { NavLink, useLocation } from "react-router-dom"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
  } from "@/components/ui/navigation-menu"
import { Logo } from "./Logo"
import { Search, CircleHelp, BellDot } from 'lucide-react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


function handlePageName(currentPageName){
    switch (currentPageName) {
        case 'dashboard':
            return 'Dashboard'
        case 'products':
            return 'Produtos'
        case 'sells':
            return 'Vendas'
        case 'purchases':
            return 'Compras'
        case 'reports':
            return 'Relatórios'
        case 'employees':
            return 'Funcionários'
        case 'settings':
            return 'Configurações'
        default:
            return <Logo type='short-black' className='w-[45px]' />
    }
}

function TopMenu() {
    const { hash, pathname, search } = useLocation()
    console.log({ hash, pathname, search })

    return (
        <header className='flex justify-between items-center montserrat text-base py-4 px-8 w-full text-wise-light_white bg-wise-hyper_black rounded-md'>
            <div className="text-2xl font-bold">
                {
                   handlePageName(pathname.split('/')[1])
                }
            </div>

            <NavigationMenu>
                <NavigationMenuList className='gap-4'>

                    <NavigationMenuItem>
                        <NavLink 
                            to='/dashboard'
                            className={`p-2 ${pathname == '/dashboard' && 'text-wise-dark_green border-b-2 border-wise-dark_green'}`}
                        >
                            Dashboard
                        </NavLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger className='text-wise-light_white bg-wise-hyper_black'>
                            <NavLink 
                                to='/products'
                                className={`p-2 ${pathname.includes('/products /virtualStock /sells /purchases') && 'text-wise-dark_green border-b-2 border-wise-dark_green'}`}
                            >
                                Produtos
                            </NavLink>
                        </NavigationMenuTrigger>

                        <NavigationMenuContent className="text-wise-light_white bg-wise-hyper_black border-none">
                            <ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                                
                                <div className="row-span-3 flex flex-col  gap-2">
                                    <Logo type='long-white' className='mb-5' />
                                    <h2 className="font-semibold text-lg leading-5">Melhore a forma como gerencia seu estoque</h2>
                                    <p className="text-sm">No StockWise você tem acesso a ferramentas de ponta para te ajudar a crescer.</p>
                                </div>

                                <NavLink 
                                    to='/virtualStock'
                                    className='p-2 rounded hover:text-wise-hyper_black hover:px-4 hover:bg-wise-hyper_white transition-all'
                                >
                                    <h3 className='font-medium'>Virtual Stock</h3>
                                    <p className="text-sm">Todos os produtos organizados em “containers virtuais” para te ajudar a organizar seus produtos.</p>
                                </NavLink>

                                <NavLink 
                                    to='/sells'
                                    className='p-2 rounded hover:text-wise-hyper_black hover:px-4 hover:bg-wise-hyper_white transition-all'
                                >
                                    <h3 className='font-medium'>Vendas</h3>
                                    <p className="text-sm">Analise e entenda todas as vendas para poder aumentar seus lucros!</p>
                                </NavLink>

                                <NavLink 
                                    to='/purchases'
                                    className='p-2 rounded hover:text-wise-hyper_black hover:px-4 hover:bg-wise-hyper_white transition-all'
                                >
                                    <h3 className='font-medium'>Compras</h3>
                                    <p className="text-sm">Acompanhe as compras que a sua empresa já vez. Aproveite e cadastre + uma!</p>
                                </NavLink>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavLink 
                            to='/reports'
                            className={`p-2 ${pathname == '/reports' && 'text-wise-dark_green border-b-2 border-wise-dark_green'}`}
                        >
                            Relatórios
                        </NavLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavLink 
                            to='/employees'
                            className={`p-2 ${pathname == '/employees' && 'text-wise-dark_green border-b-2 border-wise-dark_green'}`}
                        >
                            Funcionários
                        </NavLink>
                    </NavigationMenuItem>

                </NavigationMenuList>
            </NavigationMenu>

            <div className="flex gap-3 items-center">
                <Dialog>
                    <DialogTrigger asChild>
                        <Search strokeWidth={3} className="cursor-pointer" />
                    </DialogTrigger>

                    <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Pesquisar</DialogTitle>
                        <DialogDescription>
                            Pesquise por páginas, produtos, containers...
                        </DialogDescription>
                        </DialogHeader>

                        <div className="w-full">
                            <input type="text" placeholder="Digite aqui..." className="w-full py-1 px-3" autoFocus />
                        </div>
                    </DialogContent>
                </Dialog>
                <CircleHelp strokeWidth={3} />
                <BellDot strokeWidth={3} />

                <img src="/public/default_profile_image.jpg" alt="" className="w-[50px] h-[50px] rounded-full" />
            </div>
        </header>
    )
}

export { TopMenu }








// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// export function DialogDemo() {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="outline">Edit Profile</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Edit profile</DialogTitle>
//           <DialogDescription>
//             Make changes to your profile here. Click save when you're done.
//           </DialogDescription>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="name" className="text-right">
//               Name
//             </Label>
//             <Input
//               id="name"
//               defaultValue="Pedro Duarte"
//               className="col-span-3"
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="username" className="text-right">
//               Username
//             </Label>
//             <Input
//               id="username"
//               defaultValue="@peduarte"
//               className="col-span-3"
//             />
//           </div>
//         </div>
//         <DialogFooter>
//           <Button type="submit">Save changes</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }
