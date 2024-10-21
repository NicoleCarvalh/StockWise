import { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";

function CreateProduct() {
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
                Foto do produto
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
                Descrição
              </label>

              <Textarea id="description" className="resize-none" />
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="category">
                Categoria
              </label>

              <Input list="category_list" id="category" name="category" required />
              <datalist id="category_list">
                <option value="Alimentação e Bebidas">Alimentação e Bebidas</option>
                <option value="Vestuário e Acessórios">Vestuário e Acessórios</option>
                <option value="Eletrodomésticos e Eletrônicos">Eletrodomésticos e Eletrônicos</option>
                <option value="Móveis e Decoração">Móveis e Decoração</option>
                <option value="Saúde e Beleza">Saúde e Beleza</option>
                <option value="Automotivo">Automotivo</option>
                <option value="Brinquedos e Jogos">Brinquedos e Jogos</option>
                <option value="Esportes e Lazer">Esportes e Lazer</option>
                <option value="Ferramentas e Materiais de Construção">Ferramentas e Materiais de Construção</option>
                <option value="Livros, Papelaria e Escritório">Livros, Papelaria e Escritório</option>
                <option value="Outra">Outra categoria não listada</option>
              </datalist>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="quantity">
                Qtd. em estoque
              </label>

              <Input id="quantity" type="number" min="0" step={1} required />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="purchase_price">
                Preço de compra
              </label>

              <Input id="purchase_price" type="number" min="0.01" step={0.01} required />
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="sale_price">
                Preço de venda
              </label>

              <Input id="sale_price" type="number" min="0.01" step={0.01} required />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="supplier">
              Fornecedor
            </label>

            <Input list="supplier_list" id="supplier" name="supplier" required />
            <datalist id="supplier_list">
              <option value="Casas Bahia">Casas Bahia</option>
              <option value="JBL">JBL - Tecnologia de ponta</option>
              <option value="Dell">Dell - Inovação tecnologica</option>
              <option value="Zara">Zara - Varejo mundial</option>
            </datalist>
          </div>

          <div className="flex-1 flex gap-2 flex-wrap">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Detalhes técnicos</Button>
              </PopoverTrigger>

              <PopoverContent className="w-80 translate-x-[2rem]">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Dimensões e peso</h4>
                    <p className="text-sm text-muted-foreground">
                      Coloque as dimensões e o peso do produto ou embalagem, caso necessário.
                    </p>
                  </div>

                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="width">Largura (cm)</Label>
                      <Input
                        id="width"
                        defaultValue="0"
                        className="col-span-2 h-8"
                        type="number"
                        min={0}
                        step={0.01}
                      />
                    </div>

                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="height">Altura (cm)</Label>
                      <Input
                        id="height"
                        defaultValue="0"
                        className="col-span-2 h-8"
                        type="number"
                        min={0}
                        step={0.01}
                      />
                    </div>

                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="length">Comprimento (cm)</Label>
                      <Input
                        id="length"
                        defaultValue="0"
                        className="col-span-2 h-8"
                        type="number"
                        min={0}
                        step={0.01}
                      />
                    </div>
                   
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="weight">Peso (Kg)</Label>
                      <Input
                        id="weight"
                        defaultValue="0"
                        className="col-span-2 h-8"
                        type="number"
                        min={0}
                        step={0.01}
                      />
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Button type="reset" variant="outline" className="flex-1 flex items-center justify-center" onClick={() => setPhotoExists(false)}>Limpar formulário</Button>
            <Button type="submit" className="flex-1 flex items-center justify-center">Cadastrar</Button>
          </div>
        </form>
    );
}

export { CreateProduct };