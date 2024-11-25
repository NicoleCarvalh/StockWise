import { AuthContext } from "@/auth/AuthProvider";
import { MainContainer } from "@/components/MainContainer";
import { TopMenu } from "@/components/TopMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ChatTab } from "@/components/_stockwizard/ChatTab";

function Profile() {
  const { isLogged, credentials } = useContext(AuthContext);
  const currentUser = credentials?.companyData;

  const [blockEdit, setBlockEdit] = useState(true);
  const [inputs, setInputs] = useState({
    email: "email.usuario@gmai.com",
    password: "senhadousuario",
  });

  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(currentUser?.createdAt));

  function handleEditProfile() {
    if (!blockEdit) {
      alert(`Email: ${inputs.email} \nSenha: ${inputs.password}`);
    }

    setBlockEdit(!blockEdit);
  }

  return (
    <>
      <TopMenu />

      <MainContainer className="flex flex-col gap-5 montserrat">
        <section className="flex flex-col gap-8">
          <h1 className="text-2xl font-bold">Perfil</h1>

          <div className="flex gap-4 flex-wrap justify-center items-center w-full min-h-300px bg-wise-hyper_black rounded-lg p-4 mb-1 md:mb-0">
            <img
              src={
                currentUser && currentUser?.photoUrl
                  ? currentUser?.photoUrl
                  : "/default_profile_image.jpg"
              }
              alt="Foto de perfil"
              className="max-w-[300px] md:max-w-[350px] min-h-[250px] flex-1 rounded-md object-cover border-none"
            />

            <div className="flex-1 flex justify-center md:justify-between gap-5 flex-wrap montserrat">
              <div className="text-wise-light_white">
                <h2 className="font-semibold text-5xl">{currentUser?.name}</h2>
                <p>
                  <span className="text-base text-wise-hyper_light_green">
                    Categoria
                  </span>{" "}
                  | {currentUser?.category}
                </p>
              </div>

              <div className="flex gap-4 flex-wrap justify-center">
                <Label className="text-wise-light_white flex flex-col gap-2">
                  Email
                  <Input
                    disabled={blockEdit}
                    value={currentUser?.email}
                    onChange={(ev) => {
                      setInputs({ ...inputs, email: ev.target.value });
                    }}
                    className="w-full max-w-[300px] min-w-[250px] text-wise-hyper_light_green bg-transparent opacity-100"
                  />
                </Label>

                <Label className="text-wise-light_white flex flex-col gap-2">
                  Senha
                  <Input
                    type="password"
                    disabled={blockEdit}
                    value={currentUser?.password}
                    onChange={(ev) => {
                      setInputs({ ...inputs, password: ev.target.value });
                    }}
                    className="w-full max-w-[300px] min-w-[250px] text-wise-hyper_light_green bg-transparent opacity-100"
                  />
                </Label>
              </div>

              <div className="w-full flex flex-wrap justify-center md:justify-between items-end text-wise-light_white gap-3">
                <h4 className="text-xl">
                  No sistema desde:{" "}
                  <span className="text-wise-hyper_light_green">
                    {formattedDate}
                  </span>
                </h4>

                <div className="flex gap-2 items-center">
                  <Link to="/logout">
                    <Button variant="outline" className="text-wise-hyper_black">
                      Sair do sistema
                    </Button>
                  </Link>
                  <Button onClick={handleEditProfile}>
                    {blockEdit ? "Editar informações" : "Salvar alterações"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ChatTab />
      </MainContainer>
    </>
  );
}

export { Profile };
