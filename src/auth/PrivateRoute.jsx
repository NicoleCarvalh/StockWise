import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

function PrivateRoute({ children }) {
  const { isLogged } = useContext(AuthContext);

  return isLogged() ? children : <Navigate to="/" replace />;
}

export { PrivateRoute };
