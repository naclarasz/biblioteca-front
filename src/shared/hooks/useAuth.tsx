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
  dadosUsuarioLogado: { idUsuario: null, idTipoUsuario: null },
  realizarLogin: async (dadosLogin: IDadosLogin) => false,
  realizarLogout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [dadosUsuarioLogado, setDadosUsuarioLogado] = useLocalStorage("user", {
    idUsuario: null,
    idTipoUsuario: null,
  });

  const realizarLogin = useCallback(
    async (dadosLogin: IDadosLogin): Promise<boolean> => {
      try {
        const res = await api.post("/Usuario/Login", dadosLogin);
        setDadosUsuarioLogado(res.data);
        return true;
      } catch (error) {
        return false;
      }
    },
    [setDadosUsuarioLogado]
  );

  const realizarLogout = useCallback(() => {
    setDadosUsuarioLogado(null);
  }, [setDadosUsuarioLogado]);

  const value = useMemo(
    () => ({
      dadosUsuarioLogado,
      realizarLogin,
      realizarLogout,
    }),
    [realizarLogin, realizarLogout, dadosUsuarioLogado]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
