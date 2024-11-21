import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Plus, Search, X } from "lucide-react";
import { useContext, useState } from "react";
import { VirtualStockContext } from "@/context/VirtualStockContextProvider";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import { QRCodeScanner } from "../QRCodeScanner";
import { AuthContext } from "@/auth/AuthProvider";
import { DeleteButton } from "../DeleteButton";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { UpdateProduct } from "../_products/UpdateProduct";

function UpdateContainer({container, closeCurrentModal}) {
    const { credentials } = useContext(AuthContext)
    const { refreshStocks } = useContext(VirtualStockContext)
    const { toast } = useToast()

    const [currentAddProduct, setCurrentAddProduct] = useState('')
    const [productsList, setProductsList] = useState(container?.products ?? [])
    const [currentFoundProduct, setCurrentFoundProduct] = useState(false)

    const [currentAddCategory, setCurrentAddCategory] = useState('')
    const [categoriesList, setCategoriesList] = useState(container?.categories ?? [])

    const [name, setName] = useState(container?.name ?? "")
    const [description, setDescription] = useState(container?.description ?? "")
    const [place, setPlace] = useState(container?.place ?? "")

    function removeCategoryFromList(categoryToRemove) {
        const cleanCategoriesList = categoriesList.filter(category => category !== categoryToRemove)

        setCategoriesList(cleanCategoriesList)
    }

    function removeProductFromList(productToRemove) {
        const cleanProductsList = productsList.filter(product => product?.code !== productToRemove?.code)
        console.log("Removido")
        console.log(cleanProductsList)

        setProductsList(cleanProductsList)
    }

    function handleSubmitForm(formEvent) {
        formEvent.preventDefault()
  
        if(productsList.length < 1){
          toast({
            title: "Você esqueceu de adicinonar os produtos!",
            variant: "destructive",
            description: "É necessário ter ao menos um produto cadastrado na compra.",
            action: (
              <ToastAction altText="Fechar">Fechar</ToastAction>
            )
          })
  
          return
        }

        if(categoriesList.length < 1){
            toast({
              title: "Você esqueceu de adicinonar uma categoria!",
              variant: "destructive",
              description: "Adicione ao menos uma categoria para o container.",
              action: (
                <ToastAction altText="Fechar">Fechar</ToastAction>
              )
            })
    
            return
        }

        console.log("productsList LIST")
        console.log(productsList)
        fetch(`${import.meta.env.VITE_API_BASE_URL}/virtualStock`, {
          method: "PUT",
          headers: {
            "Authorization": `Bearded ${credentials.token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: container?.id,
            products: productsList,
            name,
            description,
            place,
            categories: categoriesList
          })
  
        }).then(json => json.json()).then(data => {
          if(data?.ERROR) {
            toast({
              title: "Ocorreu um erro durante a criação do container!",
              variant: "destructive",
              description: <p>{data?.ERROR} <br/>Tente novamente</p>,
              action: (
                <ToastAction altText="Fechar">Fechar</ToastAction>
              )
            })
  
            return
          }
  
          toast({
            title: "Container atualizado com sucesso!",
            action: (
              <ToastAction altText="Fechar">Fechar</ToastAction>
            )
          })
          

          refreshStocks()

          closeCurrentModal && closeCurrentModal()
        }).catch(error => {
          toast({
            title: "Ocorreu um erro durante a criação do container!",
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
            } else {
                toast({
                    title: "Nenhum produto encontrado",
                    variant: "destructive",
                    description: <p>Certifique-se de que o código inserio esta no formato correto e exista. Após isso tente novamente.</p>,
                    action: (
                    <ToastAction altText="Fechar">Fechar</ToastAction>
                    )
                })
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
        }
  
    }

    function handleAddCategory() {
        if(!currentAddCategory.trim()) {
            toast({
                title: "Categoria vazia!",
                variant: "destructive",
                description: "Favor, adcione um texto válido na criação de uma categoria.",
                action: (
                  <ToastAction altText="Fechar">Fechar</ToastAction>
                )
            })

            return
        }

        const categoryExists = categoriesList.find(categ => categ == currentAddCategory)

        if(categoryExists != undefined) {

            toast({
                title: "Categoria repetida!",
                variant: "destructive",
                description: "Favor, coloque categorias diferentes.",
                action: (
                  <ToastAction altText="Fechar">Fechar</ToastAction>
                )
            })

            setCurrentAddCategory("")

            return
        }

        setCategoriesList([...categoriesList, currentAddCategory])
        setCurrentAddCategory("")
    }

    return (
        <form action="" method="POST" className="flex flex-col gap-2" onSubmit={handleSubmitForm}>
            <div className="flex flex-col gap-2">
                <label htmlFor="name">
                    Nome
                </label>

                <Input id="name" required value={name} onChange={(ev) => setName(ev.target.value)} />
            </div>
          
            <div className="flex flex-col gap-2">
              <label htmlFor="description">
                Descrição
              </label>

              <Textarea id="description" className="resize-none" required value={description} onChange={(ev) => setDescription(ev.target.value)} />
            </div>

            <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="place">
                    Local físico dos produtos
                </label>

                <Input id="place" required value={place} onChange={(ev) => setPlace(ev.target.value)} />
            </div>

            <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="category">
                    Categoria
                </label>

                <div className="flex gap-3">
                    <Input list="category_list" id="category" name="category" value={currentAddCategory} onChange={(ev) => setCurrentAddCategory(ev.target.value)} />
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

                    <Button type="button" onClick={handleAddCategory}>
                        <Plus size={20} />
                    </Button>
                </div>

                <div className="flex flex-col gap-3">
                    <h3 className="font-semibold">Categorias do container</h3>

                    <ul className="flex justify-between gap-y-4 gap-x-2 flex-wrap">
                        {
                        (categoriesList && categoriesList.length > 0) ? categoriesList.map((categ, idx) => (
                            <li key={categ+idx} className="relative flex items-center justify-between pr-2 gap-3 rounded-sm border border-wise-hyper_black">
                                <h4 className="px-2 py-1">
                                    {categ}
                                </h4>

                                <span 
                                    onClick={() => removeCategoryFromList(categ)}
                                    className="absolute -top-3 -right-3 cursor-pointer flex items-center justify-center h-[25px] rounded-full w-[25px] px-1 bg-wise-dark_red text-wise-hyper_white">
                                    <X size={20} />
                                </span>
                            </li>
                        )) : <i>Nenhuma categoria adicionada ainda...</i>
                        }
                    </ul>
                </div>
            </div>

            <div className="relative flex flex-col gap-2 flex-1 mb-4">
                <h4 className="text-base font-semibold border-b-2 border-wise-dark_green py-3">Produtos</h4>
                <QRCodeScanner buttonClassName="my-2" callAfterFound={setCurrentFoundProduct} disableAbsoluteModal={true} /> 

                <div className="flex gap-3">
                    <Input placeholder='Digite o código do protudo. Ex: #...' value={currentAddProduct} onChange={(ev) => {setCurrentAddProduct(ev.target.value.trim())}} />

                    <Button type="button" variant="outline" onClick={handleSearchProduct}>
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

                                    <Button type="button" size="sm" onClick={handleAddNewProduct}>
                                        <Plus size={20} />
                                    </Button>
                                </li>
                            )
                        }
                    </ul>
                </div>

                <div className="flex flex-col gap-3">
                    <h3 className="font-semibold border-wise-dark_red">Produtos guardados no container</h3>

                    <ul>
                        {
                        (productsList && productsList.length > 0) ? productsList.map((prod, idx) => (
                            <li key={prod?.code+idx} className="flex justify-between gap-2 items-center py-2 border-b border-b-wise-hyper_black">
                                <Dialog>
                                    <DialogTrigger className="flex flex-col gap-1">
                                        <h4 className="text-base font-semibold">{prod?.name}</h4>
                                        <p className="text-sm">Fornecedor: {prod?.supplier}</p>
                                    </DialogTrigger>

                                    <DialogContent overlayClassName="bg-transparent" className="max-w-[90%] md:max-w-[60%]">
                                        <DialogHeader>
                                            <DialogTitle className="text-lg font-semibold border-b-2 border-wise-dark_green py-3">{prod.name}</DialogTitle>
                                            <DialogDescription>
                                                Visualize e edite as informações do produto como desejar.
                                            </DialogDescription>
                                        </DialogHeader>

                                        <UpdateProduct product={prod} />
                                    </DialogContent>
                                </Dialog>

                                <Button 
                                    variant="destructive"
                                    onClick={() => removeProductFromList(prod)}
                                    size="sm"
                                    type="button"
                                >
                                    <X size={20} />
                                </Button>
                            </li>
                        )) : <i>Nenhum produto adicionado ainda...</i>
                        }
                    </ul>
                </div>
            </div>

            <div className="flex-1 flex gap-2 flex-wrap">
                <Button type="reset" variant="outline" className="flex-1 flex items-center justify-center">Limpar formulário</Button>
                <Button type="submit" className="flex-1 flex items-center justify-center">Atualizar</Button>
            </div>

            <div className="w-full my-3">
                <DeleteButton databaseEntity="virtualStock" entityDeleted={container?.id} callBackAfterDelete={() => closeCurrentModal && closeCurrentModal()} variant="destructive" buttonClassName="w-full flex-1 flex items-center justify-center">
                    Excluir container {container?.code}
                </DeleteButton>
            </div>
        </form>
    )
}

export { UpdateContainer }