import { Label } from "ui/label";
import { Input } from "ui/input";
import { Button } from "ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { AuthContext } from "@/auth/AuthProvider";

function LoginForm() {
  const navigate = useNavigate()
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const loginButtonRef = useRef(null)

  const { toast } = useToast()
  const {handleCredentials} = useContext(AuthContext)

  const handleSubmit = (formEvent) => {
    formEvent.preventDefault()

    toast({
      title: "Buscando pelo seu acesso...",
      description: <p>Favor, aguarde alguns instantes.</p>,
      action: (
        <ToastAction altText="Fechar">Fechar</ToastAction>
      )
    })

    emailRef.current.disabled = true
    passwordRef.current.disabled = true
    loginButtonRef.current.disabled = true

    fetch(`${import.meta.env.VITE_API_BASE_URL}/company/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passwordRef.current.value
      })
    }).then(json => json.json()).then(data => {
        if(data?.companyExists) {
          handleCredentials(data.company, data.token).then(() => {
            toast({
              title: "Bem vindo(a) ao sistema!",
              action: (
                <ToastAction altText="Fechar">Obrigado(a)!</ToastAction>
              )
            })

            navigate("/dashboard")
          })
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

          emailRef.current.disabled = false
          passwordRef.current.disabled = false
          loginButtonRef.current.disabled = false

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

        emailRef.current.disabled = false
        passwordRef.current.disabled = false
        loginButtonRef.current.disabled = false
    }).catch(error => {
      toast({
        title: "Ocorreu um erro durante o login!",
        variant: "destructive",
        description: <p>{error?.message ?? error} <br /> O erro foi interno em nosso servidor. Por favor, tente novamente mais tarde.</p>,
        action: (
          <ToastAction altText="Fechar">Fechar</ToastAction>
        )
      })

      emailRef.current.disabled = false
      passwordRef.current.disabled = false
      loginButtonRef.current.disabled = false
    })
  }

  return (
    <form className="grid gap-y-[24px] md:w-full md:max-w-[400px]" onSubmit={handleSubmit}>
      <Label className="md:text-lg lg:text-xl">E-mail</Label>
      <Input type="email" placeholder="E-mail" required className="md:text-lg" ref={emailRef}
        onChange={(ev) => emailRef.current.value = ev.target.value} />
      <Label className="md:text-lg lg:text-xl">Senha</Label>
      <Input type="password" placeholder="Senha" required className="md:text-lg" minLength={8} ref={passwordRef}
        onChange={(ev) => passwordRef.current.value = ev.target.value}/>
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
          ref={loginButtonRef}
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
