import { useContext, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";
import { AuthContext } from "@/auth/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import { ProductsContext } from "@/context/ProductsContextProvider";

function UpdateProduct({product}) {
    const {credentials} = useContext(AuthContext) 
    const { toast } = useToast()
    const [photoExists, setPhotoExists] = useState(product?.photoUrl ? true : false)
    const [photoUrl, setPhotoUrl] = useState(product?.photoUrl ?? "")
    const { refreshProducts } = useContext(ProductsContext)

    const imageRef = useRef(null)

    const [name, setName] = useState(product?.name ?? '')
    const [description, setDescription] = useState(product?.description ?? '')
    const [category, setCategory] = useState(product?.category ?? '')
    const [quantityInStock, setQuantityInStock] = useState(product?.quantityInStock ?? 0)
    const [purchasePrice, setPurchasePrice] = useState(product?.purchasePrice ?? 0)
    const [salePrice, setSalePrice] = useState(product?.salePrice ?? 0)
    const [supplier, setSupplier] = useState(product?.supplier ?? '')
 
    const [width, setWidth] = useState(product?.technicalDetails?.width ?? 0)
    const [height, setHeight] = useState(product?.technicalDetails?.height ?? 0)
    const [length, setLength] = useState(product?.technicalDetails?.length ?? 0)
    const [weight, setWeight] = useState(product?.technicalDetails?.weight ?? 0)


    function handleForm(formEvent) {
      formEvent.preventDefault()
      const formDataToSend = new FormData()
      
      formDataToSend.append("id", product.id)
      formDataToSend.append("name", name)
      formDataToSend.append("category", category)
      formDataToSend.append("quantityInStock", quantityInStock)
      formDataToSend.append("purchasePrice", purchasePrice)
      formDataToSend.append("salePrice", salePrice)
      formDataToSend.append("supplier", supplier)
      
      imageRef?.current && formDataToSend.append("image", imageRef?.current[0] ?? null)
      formDataToSend.append("description", description ?? null)
      
      const technicalDetails = {
        width: width ?? null,
        height: height ?? null,
        length: length ?? null,
        weight: weight ?? null
      }
        
      formDataToSend.append("technicalDetails", JSON.stringify(technicalDetails))

      fetch(`${import.meta.env.VITE_API_BASE_URL}/product`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${credentials.token}`
        },
        body: formDataToSend
      }).then(json => json.json()).then(data => {
        toast({
          title: `Produto ${data.code} atualizado com sucesso!`,
          action: (
            <ToastAction altText="Fechar">Fechar</ToastAction>
          )
        })

        refreshProducts()
      }).catch(error => {
        toast({
          title: "Ocorreu um erro durante a atualização do registro!",
          variant: "destructive",
          description: <p>{error?.message} <br/> Tente novamente.</p>,
          action: (
            <ToastAction altText="Fechar">Fechar</ToastAction>
          )
        })
      })

      toast({
        title: `O produto está sendo atualizado em sistema...`,
        description: "Aguarde que você ja será notificado quando a for completada.",
        action: (
          <ToastAction altText="Fechar">Ok!</ToastAction>
        )
      })
    }

    function handlePhotoPreview(ev) {
      if(ev.target.files && ev.target.files[0]) {
        setPhotoUrl(URL.createObjectURL(ev.target.files[0]))

        setPhotoExists(true)

        imageRef.current = ev.target.files
      }
    }

    return (
        <form method="POST" className="flex flex-col gap-2" onSubmit={handleForm}>
          <div className="flex flex-col gap-2">
              <label htmlFor="name">
                Nome
              </label>

              <Input 
                id="name" 
                required 
                value={name}
                onChange={(ev) => {setName(ev.target.value)}} 
            />
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="photo">
                Foto do produto
              </label>

              <Input id="photo" type="file" ref={imageRef} onChange={handlePhotoPreview} />
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

                <Textarea 
                    id="description" 
                    className="resize-none" 
                    value={description}
                    onChange={(ev) => {setDescription(ev.target.value)}} 
                />
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="category">
                Categoria
              </label>

              <Input 
                list="category_list" 
                id="category" 
                name="category" 
                value={category}
                required 
                onChange={(ev) => {setCategory(ev.target.value)}} 
                />
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

              <Input id="quantity" type="number" value={quantityInStock} min="0" step={1} required onChange={(ev) => {setQuantityInStock(ev.target.value)}} />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="purchase_price">
                Preço de compra
              </label>

              <Input id="purchase_price" type="number" value={purchasePrice} min="0.01" step={0.01} required onChange={(ev) => {setPurchasePrice(ev.target.value)}} />
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="sale_price">
                Preço de venda
              </label>

              <Input id="sale_price" type="number" 
              value={salePrice} min="0.01" step={0.01} required 
              onChange={(ev) => {setSalePrice(ev.target.value)}}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="supplier">
              Fornecedor
            </label>

            <Input list="supplier_list" id="supplier" value={supplier} name="supplier" required onChange={(ev) => {setSupplier(ev.target.value)}} />
            <datalist id="supplier_list">
              <option value="Casas Bahia">Casas Bahia</option>
              <option value="JBL">JBL - Tecnologia de ponta</option>
              <option value="Dell">Dell - Inovação tecnologica</option>
              <option value="Zara">Zara - Varejo mundial</option>
            </datalist>
          </div>

          <div className="flex-1 flex gap-2 flex-wrap">
            <Popover className="max-w-full">
              <PopoverTrigger asChild>
                <Button variant="outline">Detalhes técnicos</Button>
              </PopoverTrigger>

              <PopoverContent className="ml-[10%] md:ml-[20%] max-w-full">
                <div className="grid gap-4 max-w-full">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Dimensões e peso</h4>
                    <p className="text-sm text-muted-foreground">
                      Coloque as dimensões e o peso do produto ou embalagem, caso necessário.
                    </p>
                  </div>
                  {/* flex flex-col gap-2 */}
                  <div className="grid gap-2 max-w-full">
                    <div className="md:grid md:grid-cols-3 md:items-center md:gap-4 flex flex-col gap-2">
                      <Label htmlFor="width">Largura (cm)</Label>
                      <Input
                        id="width"
                        className="md:col-span-2 flex-1 max-w-full h-8"
                        type="number"
                        value={width}
                        min={0}
                        step={0.01}
                        onChange={(ev) => {setWidth(ev.target.value)}}
                      />
                    </div>

                    <div className="md:grid md:grid-cols-3 md:items-center md:gap-4 flex flex-col gap-2">
                      <Label htmlFor="height">Altura (cm)</Label>
                      <Input
                        id="height"
                        className="md:col-span-2 flex-1 max-w-full h-8"
                        type="number"
                        value={height}
                        min={0}
                        step={0.01}
                        onChange={(ev) => {setHeight(ev.target.value)}}
                      />
                    </div>

                    <div className="md:grid md:grid-cols-3 md:items-center md:gap-4 flex flex-col gap-2">
                      <Label htmlFor="length">Comprimento (cm)</Label>
                      <Input
                        id="length"
                        className="md:col-span-2 flex-1 max-w-full h-8"
                        type="number"
                        value={length}
                        min={0}
                        step={0.01}
                        onChange={(ev) => {setLength(ev.target.value)}}
                      />
                    </div>
                   
                    <div className="md:grid md:grid-cols-3 md:items-center md:gap-4 flex flex-col gap-2">
                      <Label htmlFor="weight">Peso (Kg)</Label>
                      <Input
                        id="weight"
                        className="md:col-span-2 flex-1 max-w-full h-8"
                        type="number"
                        value={weight}
                        min={0}
                        step={0.01}
                        onChange={(ev) => {setWeight(ev.target.value)}}
                      />
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Button type="reset" variant="outline" className="flex-1 flex items-center justify-center" onClick={() => {
              setPhotoExists(product?.photoUrl ? true : false)
              setPhotoUrl(product?.photoUrl ?? "")
            }}>Limpar formulário</Button>
            <Button type="submit" className="flex-1 flex items-center justify-center">Atualizar</Button>
          </div>
        </form>
    );
}

export { UpdateProduct };