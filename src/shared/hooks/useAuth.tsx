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
import { useToast } from "@chakra-ui/react";

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

  const toast = useToast();

  const realizarLogin = useCallback(
    async (dadosLogin: IDadosLogin): Promise<boolean> => {
      try {
        const res = await api.post("/Usuario/Login", dadosLogin);
        setDadosUsuarioLogado(res.data);
        toast({
          title: "Login realizado com sucesso",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        return true;
      } catch (error) {
        toast({
          title: "Erro ao realizar login",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        return false;
      }
    },
    [setDadosUsuarioLogado, toast]
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
