import { AuthContext } from "@/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { Wisebox } from "@/components/Wisebox";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
// import img from "./../../public/"

export function Logout() {
    const { logOut } = useContext(AuthContext);

    return (
    <section className="min-h-screen h-screen montserrat">
        <div id="banner" className="bg-wise-hyper_black h-full relative flex justify-center items-center overflow-hidden md:overflow-hidden text-wise-light_white">
            <div className=" md:block absolute top-[-50px] right-[-1%] w-[180px] animate-[derive_10s_linear_infinite]"><Wisebox className="rotate-[-35deg]" /></div>
            <div className="hidden md:block absolute top-[20%] right-[20%] w-[200px] animate-[derive_10s_linear_infinite]"><Wisebox className="rotate-[-8deg]" /></div>
            <div className="hidden md:block absolute top-[60%] right-[5%] w-[75px] animate-[derive_15s_linear_infinite]"><Wisebox className="rotate-[8deg]" /> </div>
            <div className=" md:block absolute top-[80%] right-[5%] w-[100px] animate-[derive_20s_linear_infinite]"><Wisebox className="rotate-[25deg]" /></div>
            <div className="hidden md:block absolute top-[32%] right-[60%] w-[70px] animate-[derive_8s_linear_infinite]"><Wisebox className="rotate-[42deg]" /></div>
            <div className=" md:block absolute top-[-1%] right-[80%] w-[120px] animate-[derive_11s_linear_infinite]"><Wisebox className="rotate-[-15deg]" /></div>
            <div className="hidden md:block absolute top-[40%] right-[9%] w-[50px] animate-[derive_20s_linear_infinite]"><Wisebox className="rotate-[32deg]" /></div>
            <div className=" md:block absolute top-[90%] right-[25%] w-[80px] animate-[derive_8s_linear_infinite]"><Wisebox className="rotate-[-5deg]" /></div>
            <div className=" md:block absolute top-[70%] right-[90%] w-[90px] animate-[derive_7s_linear_infinite]"><Wisebox className="rotate-[-19deg]" /></div>
            <div className="hidden md:block absolute top-[85%] right-[60%] w-[90px] animate-[derive_10s_linear_infinite]"><Wisebox className="rotate-[-30deg]" /></div>
            <div className=" md:block absolute top-[50px] right-[50%] w-[60px] animate-[derive_13s_linear_infinite]"><Wisebox className="rotate-[53deg]" /></div>
            
            <div className=" md:block absolute top-[25%] left-[2%] w-[80px] animate-[derive_11s_linear_infinite]"><Wisebox className="rotate-[-45deg]" /></div>
            <div className=" md:block absolute top-[45%] right-[45%] w-[90px] animate-[derive_11s_linear_infinite]"><Wisebox className="rotate-[15deg]" /></div>
            <div className=" md:block absolute bottom-[50%] right-[-2%] md:bottom-[-2%] md:right-[80%] w-[120px] animate-[derive_11s_linear_infinite]"><Wisebox className="rotate-[-15deg]" /></div>
            <div className=" md:block absolute bottom-[-2%] left-[-2%] md:top-[-2%] md:right-[30%] w-[120px] animate-[derive_11s_linear_infinite]"><Wisebox className="rotate-[-15deg]" /></div>

            <div className="overflow-auto font-semibold deepGlassmorph size-full w-full max-w-[80%] max-h-[90%] my-3 flex flex-col gap-8 items-center md:justify-between p-8 md:p-16">

                <div className="flex flex-col gap-2 justify-start min-w-full">
                    <h1 className="montserrat font-[900] text-6xl 2xl:text-7xl">
                        Eii! Volte aqui
                    </h1>

                    <h3 className="text-xl">Você tem certeza que deseja sair do sistema?</h3>
                </div>

                <div className="flex gap-8 justify-center flex-col-reverse lg:flex-row lg:justify-between flex-wrap min-w-full">
                    <div className="flex flex-col justify-between gap-4 max-w-full flex-1">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-xl">Deixe seu feedback sobre o projeto antes de ir</h3>
                            
                            <Link to="https://forms.office.com/r/XxXE4RGptp" className="flex" target="_blank">
                                <Button 
                                    className="whitespace-normal border bg-wise-dark_green border-wise-hyper_black flex-1 hover:text-wise-hyper_black max-w-full min-h-fit"
                                    type="button" 
                                    variant="outline"
                                >
                                    Responder 5 perguntinhas rápidas
                                </Button>
                            </Link>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Link to="/" className="flex">
                                <Button 
                                    className="border bg-wise-dark_green border-wise-hyper_black flex-1 flex gap-3 hover:text-wise-hyper_black hover:gap-4 max-w-full"
                                    type="button" 
                                    variant="outline"
                                    onClick={logOut}
                                >
                                    Sair do sistema
                                    <ChevronRight size={20} />
                                </Button>
                            </Link>

                            <Link to="/dashboard" className="flex">
                                <Button 
                                    className="border border-wise-hyper_black bg-wise-hyper_black text-wise-light_white flex-1 flex gap-3 hover:text-wise-hyper_black hover:gap-4 max-w-full"
                                    type="button" 
                                    variant="outline"
                                >
                                    <ChevronLeft size={20} />
                                    Voltar para o sistema
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <img 
                        className="max-w-[500px] w-full hidden md:block "
                        src="/undraw_reviews.svg" 
                        alt="Ilustração com uma mulher colocando um comentário avaliativo em uma parede." 
                    />
                </div>
            </div>
        </div>
    </section>
    );
}