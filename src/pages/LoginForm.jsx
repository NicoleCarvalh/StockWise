import { Label } from "ui/label";
import { Input } from "ui/input";
import { Button } from "ui/button";
import { Link } from "react-router-dom";

function LoginForm() {
  return (
    <form className="grid gap-y-[24px] md:w-full md:max-w-[400px]">
      <Label className="md:text-lg lg:text-xl">E-mail</Label>
      <Input type="email" placeholder="E-mail" required className="md:text-lg" />
      <Label className="md:text-lg lg:text-xl">Senha</Label>
      <Input type="password" placeholder="Senha" required className="md:text-lg"/>
      <a
        className="block underline underline-offset-1 font-semibold w-full text-right hover:text-wise-dark_green transition-all md:text-lg lg:text-xl"
        href="#"
      >
        Esqueceu a senha?
      </a>
      <div className="flex flex-col gap-y-[24px]">
        <Button className="bg-wise-hyper_black w-full transition-all md:text-lg lg:text-xl">
          Login
        </Button>
        <Button className="border-black border-2 bg-wise-hyper_white text-wise-hyper_black hover:bg-slate-200 w-full gap-1 md:text-lg lg:text-xl">
          <img className="w-[22px]" src="/google.png" alt="" />
          Login com Google
        </Button>
        <Link
          className="block underline underline-offset-1 font-semibold w-full text-center hover:text-wise-dark_green transition-all md:text-lg lg:text-xl"
          to={`/signup`}
        >
          Cadastre-se
        </Link>
      </div>
    </form>
  );
}

export { LoginForm };
