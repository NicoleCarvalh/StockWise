// import img from "@/assets/ShortStockWiseLogo.svg"
// import {StockWise_Logo} from '@/components/ui/logo.jsx'
import { Label } from "ui/label";
import { Input } from "ui/input";
import { Button } from "./components/ui/button";
import { Logo } from "./components/Logo";
import { Wisebox } from "./components/Wisebox";

const viewportWidth = window.innerWidth;

function App() {
  return (
    <>
      <main
        id="login-page"
        className="h-[100vh] overflow-y-hidden grid grid-cols-8 gap-[12px] p-[24px]"
      >
        <section
          id="main-login"
          className="pt-[4rem] col-start-1 col-span-8 md:col-end-5 md:flex md:flex-col md:p-0 md:items-center md:align-middle md:justify-center"
        >
          <Logo className="py-[36px] mx-auto md:w-[400px]" type={viewportWidth >= 768 ? "long-black" : "long-green"} />
          <form className="grid gap-y-[24px] md:w-full md:max-w-[400px]">
            <Label>E-mail</Label>
            <Input type="email" placeholder="E-mail" />
            <Label>Senha</Label>
            <Input type="password" placeholder="Senha" />
            <a
              className="block underline underline-offset-1 font-semibold w-full text-right hover:text-wise-dark_green transition-all"
              href="#"
            >
              Esqueceu a senha?
            </a>
            <div className="flex flex-col gap-y-[24px]">
              <Button className="bg-wise-hyper_black w-full transition-all">Login</Button>
              <Button className="border-black border-2 bg-wise-hyper_white text-wise-hyper_black hover:bg-slate-200 w-full gap-1">
                <img className="w-[22px]" src="/google.png" alt=""/>
                Login com Google
              </Button>
              <a
              className="block underline underline-offset-1 font-semibold w-full text-center hover:text-wise-dark_green transition-all"
              href="#"
            >
              Cadastre-se
            </a>
            </div>
          </form>
        </section>
        <section id="full-login" className="hidden md:block md:col-start-5 md:col-end-10">
          <div id="banner" className="bg-wise-hyper_black rounded-md h-full relative flex justify-center items-center overflow-hidden">
            <div className="absolute top-[-100px] right-[-1%] w-[180px] animate-[derive_10s_linear_infinite]"><Wisebox className="rotate-[-35deg]" /></div>
            <div className="absolute top-[20%] right-[20%] w-[200px] animate-[derive_10s_linear_infinite]"><Wisebox className="rotate-[-8deg]" /></div>
            <div className="absolute top-[60%] right-[30%] w-[154px] animate-[derive_15s_linear_infinite]"><Wisebox className="rotate-[8deg]" /> </div>
            <div className="absolute top-[70%] right-[5%] w-[100px] animate-[derive_20s_linear_infinite]"><Wisebox className="rotate-[25deg]" /></div>
            <div className="absolute top-[30%] right-[60%] w-[250px] animate-[derive_8s_linear_infinite]"><Wisebox className="rotate-[42deg]" /></div>
            <div className="absolute top-[-1%] right-[80%] w-[120px] animate-[derive_6s_linear_infinite]"><Wisebox className="rotate-[-15deg]" /></div>
            <div className="absolute top-[40%] right-[9%] w-[50px] animate-[derive_6s_linear_infinite]"><Wisebox className="rotate-[32deg]" /></div>
            <div className="absolute top-[90%] right-[25%] w-[80px] animate-[derive_8s_linear_infinite]"><Wisebox className="rotate-[-5deg]" /></div>
            <div className="absolute top-[70%] right-[90%] w-[90px] animate-[derive_7s_linear_infinite]"><Wisebox className="rotate-[-19deg]" /></div>
            <div className="absolute top-[85%] right-[60%] w-[90px] animate-[derive_10s_linear_infinite]"><Wisebox className="rotate-[-30deg]" /></div>
            <div className="absolute top-[50px] right-[50%] w-[60px] animate-[derive_13s_linear_infinite]"><Wisebox className="rotate-[53deg]" /></div>

            <div id="glassmorph" className="glassmorph size-full w-full max-w-[80%] max-h-[90%] flex items-center p-[2rem]">
              <h1 className="text-wise-hyper_white montserrat font-[900] text-6xl 2xl:text-7xl" >Domine seu estoque com um simples login</h1>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export { App };
