import { NavLink, useLocation, useNavigate } from "react-router-dom"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Logo } from "./Logo"
import { Search, CircleHelp, BellDot, LogOut } from 'lucide-react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "@/auth/AuthProvider"

const commands = [
    {
        "action": "Ir para Perfil",
        "command": "Alt + A"
    },
    {
        "action": "Ir para Home",
        "command": "Alt + H"
    },  
    {
        "action": "Ir para VStock",
        "command": "Alt + V"
    }, 
    {
        "action": "Ir para Vendas",
        "command": "Alt + S"
    }, 
    {
        "action": "Ir para Clientes",
        "command": "Alt + C"
    },   
    {
        "action": "Ir para Produtos",
        "command": "Alt + P"
    },
    {
        "action": "Ir para Relatórios",
        "command": "Alt + R"
    },
    {
        "action": "Ir para Chatbot",
        "command": "Alt + W"
    },
    {
        "action": "Sair",
        "command": "Alt + L"
    },
]


function handlePageName(currentPageName){
    switch (currentPageName) {
        case 'dashboard':
            return 'Dashboard'
        case 'products':
            return 'Produtos'
        case 'sales':
            return 'Vendas'
        case 'purchases':
            return 'Compras'
        case 'virtualStock':
            return (
                <>
                    Virtual<span className="text-wise-hyper_light_green">Stock</span>
                </>
            )
        case 'reports':
            return 'Relatórios'
        case 'clients':
            return 'Clientes'
        case 'profile':
            return 'Perfil'
        default:
            return <Logo type='long-white' className='h-[40px]' />
    }
}

function TopMenu() {
    const { isLogged, credentials } = useContext(AuthContext);
    const currentUser = credentials?.companyData;
    const navigate = useNavigate()
    
    const { hash, pathname, search } = useLocation()
    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false)

    function keyPressHandler(windowEvent) {
        const firstKeyPressedIsAlt = windowEvent.altKey

        if(!firstKeyPressedIsAlt) return

        switch (windowEvent.key) {
            case "a": // account -> p = products
                navigate('/profile')
                break;
            case "h": // home -> d (navegador já tem pra poder focar na url)
                navigate('/dashboard')
                break;
            case "v":
                navigate('/virtualStock')
                break;
            case "s":
                navigate('/sales')
                break;
            case "c":
                navigate('/clients')
                break;
            case "p":
                navigate('/products')
                break;
            case "r":
                navigate('/reports')
                break;

            case "l":
                navigate('/logout')
                break;
        
            default:
                break;
        }
    }
  
    useEffect(() => {
        window.addEventListener('keydown', keyPressHandler);
    }, [])

    return (
        <header className='flex flex-wrap justify-between items-center montserrat text-base py-4 px-8 w-[96%] text-wise-light_white bg-wise-hyper_black fixed rounded-md gap-3 mx-[2%] top-[1%] mt-[2%] lg:mt-[1%] z-10'>
            <div className="text-2xl font-bold">
                {
                   handlePageName(pathname.split('/')[1])
                }
            </div>

            <div className="hidden lg:flex gap-5">
                <NavigationMenu>
                    <NavigationMenuList className='gap-7'>

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
                                    className={`p-2 ${['/products', '/virtualStock', '/sales', '/purchases'].includes(pathname) && 'text-wise-dark_green border-b-2 border-wise-dark_green'}`}
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
                                        to='/sales'
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
                                        <p className="text-sm">Acompanhe as compras que a sua empresa já fez. Aproveite e cadastre + uma!</p>
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
                                to='/clients'
                                className={`p-2 ${pathname == '/clients' && 'text-wise-dark_green border-b-2 border-wise-dark_green'}`}
                            >
                                Clientes
                            </NavLink>
                        </NavigationMenuItem>

                    </NavigationMenuList>
                </NavigationMenu>

                <div className="flex gap-5 items-center">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Search strokeWidth={3} className="cursor-pointer" />
                        </DialogTrigger>

                        <DialogContent>
                        <   DialogHeader>
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

                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <CircleHelp strokeWidth={3} className="cursor-pointer" />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent  className="my-[1rem] min-w-[200px]">

                            <DropdownMenuLabel>
                                <div>
                                    Conheça os atalhos do sistema
                                </div>

                            </DropdownMenuLabel>

                            <DropdownMenuSeparator />

                            <div className="p-2">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Ação</th>
                                            <th>Atalho</th>
                                        </tr>
                                    </thead>
                                    
                                    <tbody>
                                        {
                                            commands.map((item, index) => <tr key={index}>
                                                <td className="px-3 py-2 whitespace-nowrap">{item.action}</td>
                                                <td  className="px-3 py-2 whitespace-nowrap">{item.command}</td>
                                            </tr>)
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <img src={currentUser && currentUser?.photoUrl ? currentUser?.photoUrl : '/default_profile_image.jpg'} alt="" className="size-[50px] max-w-[50px] rounded-full object-cover" />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="mx-[1.5rem] my-[.5rem] min-w-[200px]">
                            <DropdownMenuLabel>
                                <h1 className="text-base">{currentUser?.name ?? "Nome da empresa"}</h1>
                                <p className="text-gray-500 text-xs">{currentUser?.email ?? "email.empresa@gmail.com"}</p>
                            </DropdownMenuLabel>

                            <DropdownMenuSeparator />

                            <NavLink to='/profile'>
                                <DropdownMenuItem className="w-full flex justify-between cursor-pointer">
                                    <h3>Perfil</h3>
                                    <small className="text-gray-500">Alt + p</small>
                                </DropdownMenuItem>
                            </NavLink>

                            <DropdownMenuSeparator />

                            <NavLink to='/logout'>
                                <DropdownMenuItem className="text-red-500 w-full flex justify-between cursor-pointer">
                                    <h3>Sair da conta</h3>
                                    <LogOut />
                                </DropdownMenuItem>
                            </NavLink>

                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)} className="lg:hidden h-[35px] flex items-center">
                <button className={`bg-transparent border-0 lg:hidden relative w-[50px] h-[30px] flex flex-col justify-between ${mobileMenuIsOpen && 'block h-full'}`}>
                    <div className={`w-full h-[3px] bg-wise-light_white rounded-sm transition-all ${mobileMenuIsOpen && 'rotate-45 absolute top-[50%]'}`}></div>
                    <div className={`w-full h-[3px] bg-wise-light_white rounded-sm transition-all ${mobileMenuIsOpen && 'rotate-45 absolute top-[50%]'}`}></div>
                    <div className={`w-full h-[3px] bg-wise-light_white rounded-sm transition-all ${mobileMenuIsOpen && 'rotate-[-45deg] absolute top-[50%]'}`}></div>
                </button>
            </div>

            <div className={`flex items-center justify-center h-full p-4 bg-wise-hyper_black text-wise-light_white w-full ${!mobileMenuIsOpen && 'hidden'}`}>
                <div className="flex flex-col items-center gap-5 w-full max-w-[400px]">
                    <NavLink 
                        to='/dashboard'
                        className={`${pathname == '/dashboard' && 'text-wise-dark_green border-b-2 border-wise-dark_green'}`}
                    >Dashboard</NavLink>
                    <NavLink 
                        to='/products'
                        className={`${pathname == '/products' && 'text-wise-dark_green border-b-2 border-wise-dark_green'}`}
                    >Produtos</NavLink>
                    <NavLink 
                        to='/virtualStock'
                        className={`${pathname == '/virtualStock' && 'text-wise-dark_green border-b-2 border-wise-dark_green'}`}
                    >Estoque</NavLink>
                    <NavLink 
                        to='/sales'
                        className={`${pathname == '/sales' && 'text-wise-dark_green border-b-2 border-wise-dark_green'}`}
                    >Vendas</NavLink>
                    <NavLink 
                        to='/purchases'
                        className={`${pathname == '/purchases' && 'text-wise-dark_green border-b-2 border-wise-dark_green'}`}
                    >Compras</NavLink>
                    <NavLink 
                        to='/reports'
                        className={`${pathname == '/reports' && 'text-wise-dark_green border-b-2 border-wise-dark_green'}`}
                    >Relatórios</NavLink>
                    <NavLink 
                        to='/clients'
                        className={`${pathname == '/clients' && 'text-wise-dark_green border-b-2 border-wise-dark_green'}`}
                    >Clientes</NavLink>
                    <NavLink 
                        to='/profile'
                        className={`${pathname == '/profile' && 'text-wise-dark_green border-b-2 border-wise-dark_green'}`}
                    >Perfil</NavLink>
                    <hr className="w-full border-wise-dark_green h-0.5" />
                    <NavLink to='/logout'>Sair da conta</NavLink>
                </div>
            </div>
        </header>
    )
}

export { TopMenu }