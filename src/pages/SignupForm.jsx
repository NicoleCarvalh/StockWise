import { useRef, useState } from "react";
import { Label } from "ui/label";
import { Input } from "ui/input";
import { Button } from "ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui/select";
import { Link, useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

function SignupForm() {
  const [imagePreview, setImagePreview] = useState(null)
  const { toast } = useToast()
  const navigate = useNavigate();

  const dropAreaRef = useRef(null)
  const inputFileRef = useRef(null)
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const categoryRef = useRef("PF")

  const handleSignupForm = (ev) => {
    ev.preventDefault()
    const formDataToSend = new FormData()

    if(inputFileRef?.current?.files && inputFileRef?.current?.files?.length > 0) {
      formDataToSend.append("image", inputFileRef.current.files[0])
    }

    formDataToSend.append("name", nameRef.current)
    formDataToSend.append("email", emailRef.current)
    formDataToSend.append("password", passwordRef.current)
    formDataToSend.append("category", categoryRef.current)

    fetch(`${import.meta.env.VITE_API_BASE_URL}/company`, {
      method: "POST",
      body: formDataToSend
    }).then(json => json.json()).then(data => {
      if(data.isError) {
        toast({
          title: "Ocorreu um erro durante o cadastro!",
          variant: "destructive",
          description: <p>{data.error}<br/> Tente novamente.</p>,
          action: (
            <ToastAction altText="Fechar">Fechar</ToastAction>
          )
        })

        return
      }

      toast({
        title: "Cadastro realizado com sucesso!",
        description: <p>{data.error}</p>,
        action: (
          <ToastAction altText="Fechar">Fechar</ToastAction>
        )
      })

      navigate("/")
    })
    .catch(error => {
      toast({
        title: "Ocorreu um erro durante o cadastro!",
        variant: "destructive",
        description: <p>{error}<br/> Tente novamente.</p>,
        action: (
          <ToastAction altText="Fechar">Fechar</ToastAction>
        )
      })
    })
  }

  const uploadImage = (file) => {
    const imgLink = URL.createObjectURL(file);
    setImagePreview(imgLink); 
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImage(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      inputFileRef.current.files = e.dataTransfer.files;
      uploadImage(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <form 
      className="grid gap-y-[24px] md:gap-y-[14px] md:w-full md:max-w-[450px]"
      onSubmit={handleSignupForm}  
    >
      <div
        id="drop-area"
        ref={dropAreaRef}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="h-[18rem] md:h-[10rem] border-4 border-dashed border-wise-dark_green text-center rounded-lg overflow-hidden"
      >
        <Label className="h-full flex items-center justify-center cursor-pointer">
          <input
            type="file"
            accept="image/*"
            id="input-file"
            ref={inputFileRef}
            onChange={handleFileChange}
            hidden
          />
          <div
            id="img-view"
            className="bg-center bg-cover h-full w-full flex items-center justify-center"
            style={{
              backgroundImage: imagePreview ? `url(${imagePreview})` : "none",
            }}
          >
            {!imagePreview && (
              <Camera className="stroke-1 stroke-wise-dark_green size-28" />
            )}
          </div>
        </Label>
      </div>

      <Label className="md:text-lg lg:text-xl">Nome</Label>
      <Input
        type="text"
        placeholder="Nome PF ou PJ"
        required
        className="md:text-lg"
        ref={nameRef}
        onChange={(ev) => nameRef.current = ev.target.value}
      />

      <Select
      // ref={categoryRef}
      value={categoryRef.current}
      onValueChange={(newValue) => categoryRef.current = newValue}
      >
        <SelectTrigger className="w-full md:text-lg">
          <SelectValue placeholder="Categoria do perfil" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="PF">Categoria: Uso pessoal</SelectItem>
          <SelectItem value="logistica">Categoria: Logística</SelectItem>
          <SelectItem value="cosmetico">Categoria: Cosméticos</SelectItem>
          <SelectItem value="tecnologia">Categoria: Tecnologia e inovação</SelectItem>
          <SelectItem value="varejo">Categoria: Varejo</SelectItem>
          <SelectItem value="outros">Categoria: outros...</SelectItem>
        </SelectContent>
      </Select>

      <Label className="md:text-lg lg:text-xl">E-mail</Label>
      <Input
        type="email"
        placeholder="E-mail"
        required
        className="md:text-lg"
        minLength="8"
        ref={emailRef}
        onChange={(ev) => emailRef.current = ev.target.value}
      />

      <Label className="md:text-lg lg:text-xl">Senha</Label>
      <Input
        type="password"
        placeholder="Senha"
        required
        className="md:text-lg"
        ref={passwordRef}
        onChange={(ev) => passwordRef.current = ev.target.value}
        minLength={8}
      />

      <div className="flex flex-col gap-y-[24px]">
        <Button className="bg-wise-hyper_black w-full transition-all md:text-lg lg:text-xl">
          Cadastrar
        </Button>
        <Link to="/">
          <Button className="border-black border-2 bg-wise-hyper_white text-wise-hyper_black hover:bg-slate-200 w-full gap-1 md:text-lg lg:text-xl">
            Voltar
          </Button>
        </Link>
      </div>

      {/* <img src="https://ehjfjfpjrrumhuycxjwf.supabase.co/storage/v1/object/public/stock_images/company/6734e0c3cdfa3db8f1a19141.jpg" alt="AQUI" srcset="" /> */}
    </form>
  );
}

export { SignupForm };
