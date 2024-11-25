import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

function PrivateRoute({ children }) {
  const { toast } = useToast();
  const { isLogged, credentials } = useContext(AuthContext);
  const token = credentials?.token;
  const navigate = useNavigate()

  if(!token || token == null || token == undefined) return <Navigate to="/" replace />;

  // Decodifica o payload do token
  const base64Url = token.split(".")[1]; // Pega a segunda parte (payload)
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Ajusta para Base64 padrão
  const payload = JSON.parse(atob(base64)); // Decodifica de Base64 e converte para objeto

  const expirationTime = payload.exp * 1000; // `exp` está em segundos
  const expirationDate = new Date(expirationTime);
  const currentDate = new Date();
  const tokenExpired = currentDate >= expirationDate;

  useEffect(() => {
    if (tokenExpired) {
      toast({
        title: "Ação de segurança!",
        variant: "destructive",
        description: (
          <p>
            Devido a segurança de nossas informações, é necessário realizar o login para acessar o sistema.
          </p>
        ),
        action: <ToastAction altText="Fechar">Fechar</ToastAction>,
      });
    }
  }, [tokenExpired]); // Chama apenas quando `tokenExpired` mudar para `true`

  return isLogged() && !tokenExpired ? children : <Navigate to="/" replace />;
}

export { PrivateRoute };
