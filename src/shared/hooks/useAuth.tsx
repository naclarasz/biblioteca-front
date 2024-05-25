import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
} from "react";
import api from "../api/api";
import { IDadosLogin } from "../types";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext({
  tipoUsuarioLogado: null,
  realizarLogin: (dadosLogin: IDadosLogin) => Promise<boolean>,
  realizarLogout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [tipoUsuarioLogado, setTipoUsuarioLogado] = useLocalStorage(
    "user",
    null
  );

  const realizarLogin = useCallback(
    async (dadosLogin: IDadosLogin): Promise<boolean> => {
      try {
        const tipoUsuario = await api.post("/Usuario/Login", dadosLogin);
        setTipoUsuarioLogado(tipoUsuario);
        return true;
      } catch (error) {
        return false;
      }
    },
    [setTipoUsuarioLogado]
  );

  const realizarLogout = useCallback(() => {
    setTipoUsuarioLogado(null);
  }, [setTipoUsuarioLogado]);

  const value = useMemo(
    () => ({
      tipoUsuarioLogado,
      realizarLogin,
      realizarLogout,
    }),
    [realizarLogin, realizarLogout, tipoUsuarioLogado]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
