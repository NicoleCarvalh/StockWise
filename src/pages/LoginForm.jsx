import { Label } from "ui/label";
import { Input } from "ui/input";
import { Button } from "ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

function LoginForm() {
  const navigate = useNavigate()
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const { toast } = useToast()

  const handleSubmit = (formEvent) => {
    formEvent.preventDefault()

    fetch(`${import.meta.env.VITE_API_BASE_URL}/company/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: emailRef.current,
        password: passwordRef.current
      })
    }).then(json => json.json()).then(data => {
      if(data?.companyExists) {
        console.log(data)
        // navigate("/dashboard")
        return
      } else if(data?.companyExists == false) {
        toast({
          title: "Credenciais incorretas!",
          variant: "destructive",
          description: "Verifique se o email e senha estão corretos e tente novamente!",
          action: (
            <ToastAction altText="Fechar">Fechar</ToastAction>
          )
        })

        return
      }

      toast({
        title: "Ocorreu um erro durante o login!",
        variant: "destructive",
        description: <p>{data?.message} <br/> Tente novamente.</p>,
        action: (
          <ToastAction altText="Fechar">Fechar</ToastAction>
        )
      })


    }).catch(error => {
      console.log("erro AQUI")
      console.log(error)

      // toast({
      //   title: "Ocorreu um erro durante o login!",
      //   variant: "destructive",
      //   description: <p>{error}<br/>Tente novamente.</p>,
      //   action: (
      //     <ToastAction altText="Fechar">Fechar</ToastAction>
      //   )
      // })
    })
  
    // navigate('/dashboard')
  }

  return (
    <form className="grid gap-y-[24px] md:w-full md:max-w-[400px]" onSubmit={handleSubmit}>
      <Label className="md:text-lg lg:text-xl">E-mail</Label>
      <Input type="email" placeholder="E-mail" required className="md:text-lg" ref={emailRef}
        onChange={(ev) => emailRef.current = ev.target.value} />
      <Label className="md:text-lg lg:text-xl">Senha</Label>
      <Input type="password" placeholder="Senha" required className="md:text-lg" minLength={8} ref={passwordRef}
        onChange={(ev) => passwordRef.current = ev.target.value}/>
      <a
        className="block underline underline-offset-1 font-semibold w-full text-right hover:text-wise-dark_green transition-all md:text-lg lg:text-xl"
        href="#"
      >
        Esqueceu a senha?
      </a>
      <div className="flex flex-col gap-y-[24px]">
        <Button 
          className="bg-wise-hyper_black w-full transition-all md:text-lg lg:text-xl"
          type="submit"
        >
          Login
        </Button>

        <Button 
          className="border-black border-2 bg-wise-hyper_white text-wise-hyper_black hover:bg-slate-200 w-full gap-1 md:text-lg lg:text-xl"
        >
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
