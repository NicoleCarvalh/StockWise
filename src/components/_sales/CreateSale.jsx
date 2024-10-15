import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

function CreateSale() {
    return (
        <form action="" className="flex flex-col gap-2">
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
        
          <div className="flex flex-col gap-2">
              <label htmlFor="payment_method">
                Forma de pagamento
              </label>

              <Input id="payment_method" required />
          </div>

          <div className="flex flex-col gap-2 flex-1 mb-4">
            <h4 className="text-base font-semibold border-b-2 border-wise-dark_green py-3">Produtos</h4>

            <Button type="button" variant="outline">
                <Plus size={20} />
                Adiconar produto
            </Button>
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="total">
              Total (R$)
            </label>

            <Input id="total" type="number" disabled />
          </div>

          <div className="flex-1 flex gap-2 flex-wrap">
            <Button type="reset" variant="outline" className="flex-1 flex items-center justify-center" onClick={() => setPhotoExists(false)}>Limpar formulário</Button>
            <Button type="submit" className="flex-1 flex items-center justify-center">Cadastrar</Button>
          </div>
        </form>
    );
}

export { CreateSale };