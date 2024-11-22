import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

function CreateClient() {
    const [photoExists, setPhotoExists] = useState(false)
    const [photoUrl, setPhotoUrl] = useState("")

    function handlePhotoPreview(ev) {
      if(ev.target.files && ev.target.files[0]) {
        setPhotoUrl(URL.createObjectURL(ev.target.files[0]))

        setPhotoExists(true)
      }
    }

    return (
        <form action="" className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
                <Label htmlFor="name">
                    Nome
                </Label>

                <Input id="name" required />
            </div>
          
            <div className="flex flex-col gap-2">
                <Label htmlFor="email">
                    E-mail
                </Label>

                <Input id="email" type="email" required />
            </div>

            <div className="flex flex-col gap-2 flex-1">
                <Label htmlFor="password">
                    Senha
                </Label>

                <Input id="password" type="password" required />
            </div>

            <div className="flex flex-col gap-2 flex-1">
                <Label htmlFor="role">
                    Cargo
                </Label>

                <Input list="role" id="role" name="role" required />
                <datalist id="role">
                    <option value="Vendedor">Vendedor</option>
                    <option value="Gerente de estoque">Gerente de estoque</option>
                </datalist>
            </div>

          <div className="flex-1 flex gap-2 flex-wrap">
            <Button type="reset" variant="outline" className="flex-1 flex items-center justify-center" onClick={() => setPhotoExists(false)}>Limpar formulário</Button>
            <Button type="submit" className="flex-1 flex items-center justify-center">Cadastrar</Button>
          </div>
        </form>
    );
}

export { CreateClient };