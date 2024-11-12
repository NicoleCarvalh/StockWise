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
import { Link } from "react-router-dom";
import { Camera } from "lucide-react";

// console.log( import.meta .REACT_APP_API_BASE_URL)

function SignupForm() {
  const [imagePreview, setImagePreview] = useState(null)
  const dropAreaRef = useRef(null)
  const inputFileRef = useRef(null)

  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const categoryRef = useRef("PF")

  const handleSignupForm = (ev) => {
    ev.preventDefault()

    console.log(imagePreview)

    console.log(nameRef.current)
    console.log(emailRef.current)
    console.log(passwordRef.current)
    console.log(categoryRef.current)

    // TODO: call the api and create company -> receive token -> save token on localStorage -> redirect to login
    // TODO: add supabase image store
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
        className="h-[18rem] md:h-[10rem] border-4 border-dashed border-wise-dark_green text-center rounded-lg"
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
      onValueChange={(newValue) => categoryRef.current = newValue}
      >
        <SelectTrigger className="w-full md:text-lg">
          <SelectValue placeholder="Categoria do perfil" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="PF">Uso pessoal</SelectItem>
          <SelectItem value="logistica">Logística</SelectItem>
          <SelectItem value="cosmetico">Cosméticos</SelectItem>
        </SelectContent>
      </Select>

      <Label className="md:text-lg lg:text-xl">E-mail</Label>
      <Input
        type="email"
        placeholder="E-mail"
        required
        className="md:text-lg"
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
    </form>
  );
}

export { SignupForm };
