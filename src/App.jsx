// import img from "@/assets/ShortStockWiseLogo.svg"
// import {StockWise_Logo} from '@/components/ui/logo.jsx'
import { Label } from "ui/label";
import { Input } from "ui/input";
import { Button } from "./components/ui/button";
import { Logo } from "./components/Logo";
import { Wisebox } from "./components/Wisebox";

function App() {
  return (
    <>
      <div
        id="login-page"
        className="h-[80vh] overflow-y-hidden grid grid-cols-8 gap-[8px] m-[24px] md:flex"
      >
        <div
          id="main-login"
          className="md:grow-0 place-content-center  col-start-1 col-span-8"
        >
          <Logo className="py-[36px]" type="long-green" />
          <form className="grid gap-y-[24px]">
            <Label>E-mail</Label>
            <Input type="email" placeholder="E-mail" />
            <Label>Senha</Label>
            <Input type="password" placeholder="Senha" />
            <a
              className="block underline underline-offset-1 font-semibold w-full text-right"
              href="#"
            >
              Esqueceu a senha?
            </a>
            <div className="flex flex-col gap-y-[24px]">
              <Button className="bg-wise-hyper_black w-full">Teste</Button>
              <Button className="border-black border-2 bg-wise-hyper_white text-wise-hyper_black hover:bg-wise-light_white w-full">
                Teste
              </Button>
            </div>
          </form>
        </div>
        <div id="full-login" className="hidden md:flex">
          <div id="banner" className="bg-wise-hyper_black rounded-md md:grow-[1]">
            <div id="glassmorph">
              <h1>Domine seu estoque com um simples login</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { App };
