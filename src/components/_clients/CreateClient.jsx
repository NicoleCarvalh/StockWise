import { useContext, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { AuthContext } from "@/auth/AuthProvider";
import { ClientContext } from "@/context/ClientsContextProvider";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";

function CreateClient({callAfterCreate = null}) {
    const {credentials} = useContext(AuthContext) 
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const { clients, setClients, refreshClients } = useContext(ClientContext)
    const { toast } = useToast()

    async function handleSubmit(formEvent) {
        formEvent.preventDefault()

        await fetch(`${import.meta.env.VITE_API_BASE_URL}/client`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${credentials.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email
            })
        })
        .then((response) => response.json())
        .then(data => {
            console.log(data)

            if(data?.ERROR) {
                toast({
                    title: "Ocorreu um erro durante o cadastro!",
                    variant: "destructive",
                    description: <p>{data?.ERROR} <br/> Tente novamente.</p>,
                    action: (
                      <ToastAction altText="Fechar">Fechar</ToastAction>
                    )
                })
            } else {
                toast({
                    title: `Cliente ${data.name} cadastrado com sucesso!`,
                    description: "O cliente que sempre compra com você, agora esta cadastrado no sistema!",
                    action: (
                      <ToastAction altText="Fechar">Fechar</ToastAction>
                    )
                  })
        
                setClients([...clients, data])
                callAfterCreate && callAfterCreate()
            }
        })
    }

    return (
        <form action="" className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
                <Label htmlFor="name">
                    Nome
                </Label>

                <Input id="name" required value={name} onChange={(ev) => setName(ev.target.value)} />
            </div>
          
            <div className="flex flex-col gap-2">
                <Label htmlFor="email">
                    E-mail
                </Label>

                <Input id="email" type="email" required value={email} onChange={(ev) => setEmail(ev.target.value)} />
            </div>

            <div className="flex-1 flex gap-2 flex-wrap">
                <Button type="reset" variant="outline" className="flex-1 flex items-center justify-center">Limpar formulário</Button>
                <Button type="submit" className="flex-1 flex items-center justify-center">Cadastrar</Button>
            </div>
        </form>
    );
}

export { CreateClient };