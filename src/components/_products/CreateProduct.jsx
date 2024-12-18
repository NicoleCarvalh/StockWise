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

function CreateProduct() {
    const {credentials} = useContext(AuthContext) 
    const { toast } = useToast()
    const [photoExists, setPhotoExists] = useState(false)
    const [photoUrl, setPhotoUrl] = useState("")
    const { products, setProducts } = useContext(ProductsContext)

    const nameRef = useRef(null)
    let imageRef = useRef(null)
    const descriptionRef = useRef(null)
    const categoryRef = useRef(null)
    const quantityInStockRef = useRef(null)
    const purchasePriceRef = useRef(null)
    const salePriceRef = useRef(null)
    const supplierRef = useRef(null)
 
    const widthRef = useRef(null)
    const heightRef = useRef(null)
    const lengthRef = useRef(null)
    const weightRef = useRef(null)

    function handleForm(formEvent) {
      formEvent.preventDefault()
      const formDataToSend = new FormData()

      formDataToSend.append("name", nameRef.current.value)
      formDataToSend.append("category", categoryRef.current.value)
      formDataToSend.append("quantityInStock", quantityInStockRef.current.value)
      formDataToSend.append("purchasePrice", purchasePriceRef.current.value)
      formDataToSend.append("salePrice", salePriceRef.current.value)
      formDataToSend.append("supplier", supplierRef.current.value)
      
      formDataToSend.append("image", (imageRef?.current && photoExists) ? imageRef?.current[0] ?? null : null)
      descriptionRef && formDataToSend.append("description", typeof descriptionRef.current?.value == 'object' ? null : descriptionRef.current.value)

      const technicalDetails = {
        width: widthRef.current?.value ? Number.parseFloat(widthRef.current?.value) : null,
        height: widthRef.current?.value ? Number.parseFloat(heightRef.current?.value) : null,
        length: widthRef.current?.value ? Number.parseFloat(lengthRef.current?.value) : null,
        weight: widthRef.current?.value ? Number.parseFloat(weightRef.current?.value) : null
      }
      
      formDataToSend.append("technicalDetails", JSON.stringify(technicalDetails))

      nameRef.current.value = ""
      imageRef.current.value = ""
      descriptionRef.current.value = ""
      categoryRef.current.value = ""
      quantityInStockRef.current.value = ""
      purchasePriceRef.current.value = ""
      salePriceRef.current.value = ""
      supplierRef.current.value = ""
      
      widthRef.current ? widthRef.current.value = "" : null
      heightRef.current ? heightRef.current.value = "" : null
      lengthRef.current ? lengthRef.current.value = "" : null
      weightRef.current ? weightRef.current.value = "" : null

      setPhotoExists(false)
      imageRef = null
      setPhotoUrl("")

      nameRef.current.focus()
      formEvent.target.reset()

      toast({
        title: `O produto está sendo cadastrado em sistema...`,
        description: "Aguarde que você ja será notificado quando a for completada.",
        action: (
          <ToastAction altText="Fechar">Ok!</ToastAction>
        )
      })

      fetch(`${import.meta.env.VITE_API_BASE_URL}/product`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${credentials.token}`
        },
        body: formDataToSend
      }).then(json => json.json()).then(data => {
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
            title: `Produto ${data.code} cadastrado com sucesso!`,
            description: "Foram criados um QRCode e um código para o novo produto! Veja mais na listagem.",
            action: (
              <ToastAction altText="Fechar">Fechar</ToastAction>
            )
          })

          setProducts([...products, data])
        }
      }).catch(error => {
        toast({
          title: "Ocorreu um erro durante o cadastro!",
          variant: "destructive",
          description: <p>{error?.message} <br/> Tente novamente.</p>,
          action: (
            <ToastAction altText="Fechar">Fechar</ToastAction>
          )
        })
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

              <Input id="name" required ref={nameRef} onChange={(ev) => {nameRef.current = ev.target}} />
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

              <Textarea id="description" className="resize-none" ref={descriptionRef} onChange={(ev) => {descriptionRef.current = ev.target}} />
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="category">
                Categoria
              </label>

              <Input list="category_list" id="category" name="category" required ref={categoryRef} onChange={(ev) => {categoryRef.current = ev.target}} />
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

              <Input id="quantity" type="number" min="0" step={1} required ref={quantityInStockRef} onChange={(ev) => {quantityInStockRef.current = ev.target}} />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="purchase_price">
                Preço de compra
              </label>

              <Input id="purchase_price" type="number" min="0.01" step={0.01} required ref={purchasePriceRef} onChange={(ev) => {purchasePriceRef.current = ev.target}} />
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="sale_price">
                Preço de venda
              </label>

              <Input id="sale_price" type="number" min="0.01" step={0.01} required ref={salePriceRef} onChange={(ev) => {salePriceRef.current = ev.target}}/>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="supplier">
              Fornecedor
            </label>

            <Input list="supplier_list" id="supplier" name="supplier" required ref={supplierRef} onChange={(ev) => {supplierRef.current = ev.target}} />
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
                        defaultValue="0"
                        className="md:col-span-2 flex-1 max-w-full h-8"
                        type="number"
                        min={0}
                        step={0.01}
                        ref={widthRef} onChange={(ev) => {widthRef.current = ev.target}}
                      />
                    </div>

                    <div className="md:grid md:grid-cols-3 md:items-center md:gap-4 flex flex-col gap-2">
                      <Label htmlFor="height">Altura (cm)</Label>
                      <Input
                        id="height"
                        defaultValue="0"
                        className="md:col-span-2 flex-1 max-w-full h-8"
                        type="number"
                        min={0}
                        step={0.01}
                        ref={heightRef} onChange={(ev) => {heightRef.current = ev.target}}
                      />
                    </div>

                    <div className="md:grid md:grid-cols-3 md:items-center md:gap-4 flex flex-col gap-2">
                      <Label htmlFor="length">Comprimento (cm)</Label>
                      <Input
                        id="length"
                        defaultValue="0"
                        className="md:col-span-2 flex-1 max-w-full h-8"
                        type="number"
                        min={0}
                        step={0.01}
                        ref={lengthRef} onChange={(ev) => {lengthRef.current = ev.target}}
                      />
                    </div>
                   
                    <div className="md:grid md:grid-cols-3 md:items-center md:gap-4 flex flex-col gap-2">
                      <Label htmlFor="weight">Peso (Kg)</Label>
                      <Input
                        id="weight"
                        defaultValue="0"
                        className="md:col-span-2 flex-1 max-w-full h-8"
                        type="number"
                        min={0}
                        step={0.01}
                        ref={weightRef} onChange={(ev) => {weightRef.current = ev.target}}
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