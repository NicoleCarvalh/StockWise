import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus, Search } from "lucide-react";
import { useContext, useState } from "react";
import { QRCodeScanner } from "../QRCodeScanner";
import { AuthContext } from "@/auth/AuthProvider";

function CreateSale() {
    const {credentials} = useContext(AuthContext) 
    const [currentAddProduct, setCurrentAddProduct] = useState('')
    const [productsList, setProductsList] = useState([])
    const [currentFoundProduct, setCurrentFoundProduct] = useState(false)

    function handleSearchProduct() {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/product?code=${currentAddProduct}`, {
        headers: {
          "Authorization": `Bearded ${credentials.token}`
        }
      }).then(json => json.json())
      .then(data => {
        if(data && data.length > 0) {
          setCurrentFoundProduct(data[0])
        }
      })
      .catch(error => console.log(error))
    }

    function handleAddNewProduct() {
      if(currentFoundProduct) {
        setProductsList([...productsList, currentFoundProduct])
        setCurrentFoundProduct(false)
      }
    }

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

          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="clientEmail">
              E-mail do cliente
            </label>

            <Input id="clientEmail" type="email" />
          </div>

          <div className="flex flex-col gap-2 flex-1 mb-4">
            <h4 className="text-lg font-semibold border-b-2 border-wise-dark_green py-3">Produtos</h4>
            {/* <QRCodeScanner />  */}

            <div className="flex gap-3">
              <Input placeholder='Digite o código do protudo...' value={currentAddProduct} onChange={(ev) => {setCurrentAddProduct(ev.target.value)}} />
              <Button type="button" onClick={handleSearchProduct}>
                <Search size={20} />
                Pesquisar
              </Button>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold">Resultado da pesquisa</h3>

              <ul>
                {
                  !currentFoundProduct ? <i>Nenhum produto encontrado ainda...</i> : (
                    <li className="flex items-center justify-between gap-3">
                      <h4>{currentFoundProduct?.name}</h4>

                      <Button type="button" onClick={handleAddNewProduct}>
                        <Plus size={20} />
                      </Button>
                    </li>
                  )
                }
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">Produtos adicionados na compra</h3>

              <ul>
                {
                  (productsList && productsList.length > 0) ? productsList.map((prod, idx) => (
                    <li key={prod?.code+idx} className="flex justify-between gap-2 items-center px-1 py-2 border-b border-b-wise-hyper_black">
                      <h4>{prod.name}</h4>

                      <div>
                        <Input type="number" min={1} defaultValue={1} max={prod.quantityInStock} required />
                      </div>
                    </li>
                  )) : <i>Nenhum produto adicionado ainda...</i>
                }
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="total">
              Total (R$)
            </label>

            <Input id="total" type="number" disabled />
          </div>

          <div className="flex-1 flex gap-2 flex-wrap">
            <Button type="reset" variant="outline" className="flex-1 flex items-center justify-center">Limpar formulário</Button>
            <Button type="submit" className="flex-1 flex items-center justify-center">Cadastrar</Button>
          </div>
        </form>
    );
}

export { CreateSale };