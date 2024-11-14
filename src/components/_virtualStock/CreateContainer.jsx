import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Plus } from "lucide-react";

function CreateContainer() {
    return (
        <form action="" className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
                <label htmlFor="name">
                    Nome
                </label>

                <Input id="name" required />
            </div>
          
            <div className="flex flex-col gap-2">
              <label htmlFor="description">
                Descrição
              </label>

              <Textarea id="description" className="resize-none" />
            </div>

            <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="place">
                    Local físico dos produtos
                </label>

                <Input id="place" required />
            </div>

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
                    <option value="Variedades">Variedade de categorias</option>
                    <option value="Outra">Outra categoria não listada</option>
                </datalist>
            </div>

            <div className="flex flex-col gap-2 flex-1 mb-4">
                <h4 className="text-base font-semibold border-b-2 border-wise-dark_green py-3">Produtos</h4>

                <Button type="button" variant="outline">
                    <Plus size={20} />
                    Adiconar produto
                </Button>
            </div>

            <div className="flex-1 flex gap-2 flex-wrap">
                <Button type="reset" variant="outline" className="flex-1 flex items-center justify-center">Limpar formulário</Button>
                <Button type="submit" className="flex-1 flex items-center justify-center">Cadastrar</Button>
            </div>
        </form>
    );
}

export { CreateContainer };