import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks";
import { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { dadosUsuarioLogado } = useAuth();

  if (!dadosUsuarioLogado?.idUsuario) {
    return <Navigate to="/login" />;
  }
  return children;
};
