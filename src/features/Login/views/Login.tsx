import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { IDadosLogin, useAuth } from "../../../shared";

export const Login = () => {
  const navigate = useNavigate();
  const { realizarLogin } = useAuth();

  const [dadosLogin, setDadosLogin] = useState<IDadosLogin>({
    email: "",
    senha: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const login = async () => {
    setLoading(true);
    const logado = await realizarLogin(dadosLogin);
    if (logado) {
      navigate("/");
    }
    setLoading(false);
  };

  const loginDeveEstarDesabilitado = !dadosLogin.email || !dadosLogin.senha;

  return (
    <VStack spacing={4} align="flex-start" w="full">
      <VStack align="flex-start">
        <Heading>Bibliotecad 📚</Heading>
        <Text fontSize="xl">Realize o login</Text>
      </VStack>

      <FormControl>
        <FormLabel>E-mail:</FormLabel>
        <Input
          rounded="none"
          variant="filled"
          value={dadosLogin.email}
          onChange={(e) =>
            setDadosLogin({ ...dadosLogin, email: e.target.value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>Senha:</FormLabel>
        <Input
          rounded="none"
          variant="filled"
          type="password"
          value={dadosLogin.senha}
          onChange={(e) =>
            setDadosLogin({ ...dadosLogin, senha: e.target.value })
          }
        />
      </FormControl>
      <Button
        rounded="none"
        colorScheme="blue"
        w="full"
        onClick={login}
        isDisabled={loginDeveEstarDesabilitado}
        isLoading={loading}
      >
        Login
      </Button>
      <Button variant="link" colorScheme="blue">
        <Link to="/cadastro">Não tem uma conta? Realize o cadastro</Link>
      </Button>
    </VStack>
  );
};
