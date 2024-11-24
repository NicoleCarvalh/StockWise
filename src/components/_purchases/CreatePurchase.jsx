import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus, Search } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { QRCodeScanner } from "../QRCodeScanner";
import { AuthContext } from "@/auth/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import { ProductsContext } from "@/context/ProductsContextProvider";
import { PurchasesContext } from "@/context/PurchasesContextProvider";

function CreatePurchase({callAfterCreate = null}) {
    const {credentials} = useContext(AuthContext) 
    const { refreshPurchases } = useContext(PurchasesContext)
    const { refreshProducts } = useContext(ProductsContext)
    const [currentAddProduct, setCurrentAddProduct] = useState('')
    const [productsList, setProductsList] = useState([])
    const [productsOrders, setProductsOrders] = useState([])

    const [client, setClient] = useState(credentials?.companyData?.name ?? '')
    const [clientEmail, setClientEmail] = useState(credentials?.companyData?.email ?? '')
    const [paymentMethod, setPaymentMethod] = useState('') 

    const [total, setTotal] = useState(0)
    const [currentFoundProduct, setCurrentFoundProduct] = useState(false)
    const { toast } = useToast()

    useEffect(() => {
      if(productsOrders < 1) {
        return
      }

      let totalCalc = 0

      productsOrders.forEach(order => {
        totalCalc += order.quantity * order.product.purchasePrice
      })

      setTotal(totalCalc)
    }, [productsOrders])

    function handleSubmitForm(formEvent) {
      formEvent.preventDefault()

      if(productsOrders.length < 1){
        toast({
          title: "Você esqueceu de adicionar os produtos!",
          variant: "destructive",
          description: "É necessário ter ao menos um produto cadastrado na compra.",
          action: (
            <ToastAction altText="Fechar">Fechar</ToastAction>
          )
        })

        return
      }

      fetch(`${import.meta.env.VITE_API_BASE_URL}/transaction`, {
        method: "POST",
        headers: {
          "Authorization": `Bearded ${credentials.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          products: productsOrders,
          clientName: client,
          clientEmail,
          paymentMethod,
          total: Number(total.toFixed(2)),
          type: "PURCHASE",
          orders: productsOrders
        })

      }).then(json => json.json()).then(data => {
        if(data?.ERROR) {
          toast({
            title: "Ocorreu um erro durante o registro da nova compra!",
            variant: "destructive",
            description: <p>{data?.ERROR} <br/>Tente novamente</p>,
            action: (
              <ToastAction altText="Fechar">Fechar</ToastAction>
            )
          })

          return
        }

        toast({
          title: "Compra cadastrada com sucesso!",
          action: (
            <ToastAction altText="Fechar">Fechar</ToastAction>
          )
        })
        
        refreshProducts()
        refreshPurchases()
        callAfterCreate && callAfterCreate()
      }).catch(error => {
        toast({
          title: "Ocorreu um erro durante o registro da nova compra!",
          variant: "destructive",
          description: <p>{error?.message} <br/>Tente novamente</p>,
          action: (
            <ToastAction altText="Fechar">Fechar</ToastAction>
          )
        })
      })
    }

    function handleSearchProduct() {
      if(currentAddProduct.length < 4 || !currentAddProduct.startsWith("#")){
        toast({
          title: "Atenção ao campo de pesquisa por produto!",
          variant: "destructive",
          description: "É necessário ter ao menos 4 caracteres para buscar por produtos (deve começar com #)",
          action: (
            <ToastAction altText="Fechar">Fechar</ToastAction>
          )
        })

        return
      }

      fetch(`${import.meta.env.VITE_API_BASE_URL}/product?code=${currentAddProduct.slice(1)}`, {
        headers: {
          "Authorization": `Bearded ${credentials.token}`
        }
      }).then(json => json.json())
      .then(data => {

        if(data?.ERROR) {
          toast({
            title: "Ocorreu um erro durante a pesquisa!",
            variant: "destructive",
            description: <p>{data?.ERROR} <br/>Tente novamente.</p>,
            action: (
              <ToastAction altText="Fechar">Fechar</ToastAction>
            )
          })

          return
        }

        if(data && data.length > 0) {
          setCurrentFoundProduct(data[0])
        }
      })
      .catch(error => {
        toast({
          title: "Ocorreu um erro durante a pesquisa!",
          variant: "destructive",
          description: <p>{error?.message} <br/>Tente novamente.</p>,
          action: (
            <ToastAction altText="Fechar">Fechar</ToastAction>
          )
        })
      })
    }

    function handleAddNewProduct() {
      const productExistsOnList = productsList.find(prod => prod.code === currentFoundProduct.code)

      if(currentFoundProduct && !productExistsOnList) {
        setProductsList([...productsList, currentFoundProduct])
        setCurrentFoundProduct(false)

        setProductsOrders([
          ...productsOrders,
          {
            product: currentFoundProduct,
            quantity: 1
          }
        ])
      }

    }

    function handleProductsOrderList(quantity, product) {
      const productsOrderCopy = [...productsOrders]

      const foundProductOrder = productsOrderCopy.find(prod => prod.product.code === product.code)
      const productOnListIndex = productsOrderCopy.indexOf(foundProductOrder)
      
      productsOrderCopy[productOnListIndex].quantity = quantity 

      setProductsOrders(productsOrderCopy)
    }

    return (
        <form action="" method="POST" className="flex flex-col gap-2" onSubmit={handleSubmitForm}>
          {/* <div className="flex flex-col gap-2">
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
          </div> */}

          <div className="flex flex-col gap-2">
            <label htmlFor="client">
              Nome do cliente
            </label>

            <Input id="client" name="client" disabled value={client} />
            {/* <Input list="client_list" id="client" name="client" required /> */}
            {/* <datalist id="supplier_list">
              <option value="Casas Bahia">Casas Bahia</option>
              <option value="JBL">JBL - Tecnologia de ponta</option>
              <option value="Dell">Dell - Inovação tecnologica</option>
              <option value="Zara">Zara - Varejo mundial</option>
            </datalist> */}
          </div>
        
          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="clientEmail">
              E-mail do cliente
            </label>

            <Input id="clientEmail" type="email" disabled value={clientEmail} />
          </div>

          <div className="flex flex-col gap-2">
              <label htmlFor="payment_method">
                Forma de pagamento
              </label>

              <Input list="payment_method_list" name="payment_method" id="payment_method" required value={paymentMethod} onChange={(ev) => setPaymentMethod(ev.target.value)} />
              <datalist id="payment_method_list">
                <option value="PIX">PIX</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
                <option value="Cartão de débito">Cartão de débito</option>
                <option value="Boleto bancário">Boleto bancário</option>
              </datalist>
          </div>

          <div className="relative flex flex-col gap-2 flex-1 mb-4">
            <h4 className="text-lg font-semibold border-b-2 border-wise-dark_green py-3">Produtos que estão entrando em estoque</h4>
            {/* <QRCodeScanner callAfterFound={setCurrentFoundProduct} disableAbsoluteModal={true} />  */}
            <QRCodeScanner  buttonClassName="my-2" callAfterFound={setCurrentFoundProduct} disableAbsoluteModal={true} />

            <div className="flex gap-3">
              <Input placeholder='Digite o código do produto. Ex: #...' value={currentAddProduct} onChange={(ev) => {setCurrentAddProduct(ev.target.value.trim())}} />
              
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
                        <Input type="number" min={1} defaultValue={1} required onChange={(ev) => handleProductsOrderList(Number.parseInt(ev.target.value), prod)} />
                      </div>
                    </li>
                  )) : <i>Nenhum produto adicionado ainda...</i>
                }
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-2 flex-1 justify-between mb-4">
            <h4 className="text-lg font-semibold border-b-2 border-wise-dark_green py-1">Total a pagar</h4>

            <h2 className="text-wise-dark_green">R$ {total.toFixed(2)} reais</h2>
          </div>

          <div className="flex-1 flex gap-2 flex-wrap">
            <Button type="reset" variant="outline" className="flex-1 flex items-center justify-center">Limpar formulário</Button>
            <Button type="submit" className="flex-1 flex items-center justify-center">Cadastrar</Button>
          </div>
        </form>
    );
}

export { CreatePurchase };