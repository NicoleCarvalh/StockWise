import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function CreateEmployee() {
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
                <label htmlFor="name">
                    Nome
                </label>

                <Input id="name" required />
            </div>

            <div className="flex gap-2">
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="photo">
                    Foto do funcionário
                </label>

                <Input id="photo" type="file" onChange={handlePhotoPreview} />
            </div>

            {
                photoExists && (
                <div className="max-h-full h-full flex-1 flex items-center justify-end">
                    <img src={photoUrl} alt="" className="h-full max-w-[80px] object-cover rounded-sm" />
                </div>
                )
            }
            
            </div>
          
            <div className="flex flex-col gap-2">
                <label htmlFor="description">
                    E-mail
                </label>

                <Input id="description" type="email" required />
            </div>

            <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="purchase_price">
                Senha
                </label>

                <Input id="purchase_price" type="password" required />
            </div>

            <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="role">
                    Cargo
                </label>

                <Input list="role_list" id="role" name="role" required />
                <datalist id="role_list">
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

export { CreateEmployee };