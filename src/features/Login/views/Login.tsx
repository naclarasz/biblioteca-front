import { useState } from "react";
import axios from "axios";
import API from "../../../shared";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";

interface ILoginData {
  matricula: string;
  senha: string;
}

export const Login = () => {
  const [dadosLogin, setDadosLogin] = useState<ILoginData>({
    matricula: "",
    senha: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const realizarLogin = async () => {
    try {
      setLoading(true);
      const payload = {
        idUsuario: dadosLogin.matricula,
        senha: dadosLogin.senha,
      };
      await API.post("/Usuario/Login", payload);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const realizarCadastro = () => {
    //redirecionar para tela de cadastro
  };

  const loginDeveEstarDesabilitado = !dadosLogin.matricula || !dadosLogin.senha;

  return (
    <Center h="calc(100vh)" w="calc(100vw)">
      <Box
        w={["full", "md"]}
        p={[8, 10]}
        mt={[20, "10vh"]}
        mx="auto"
        border={["none", "1px"]}
        borderColor={["", "gray.300"]}
        borderRadius={10}
      >
        <VStack spacing={4} align="flex-start" w="full">
          <VStack align="flex-start">
            <Heading>Sistema Bibliotecário</Heading>
            <Text fontSize="xl">Realize o login</Text>
          </VStack>

          <FormControl>
            <FormLabel>Matrícula:</FormLabel>
            <Input
              rounded="none"
              variant="filled"
              value={dadosLogin.matricula}
              onChange={(e) =>
                setDadosLogin({ ...dadosLogin, matricula: e.target.value })
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
            onClick={realizarLogin}
            isDisabled={loginDeveEstarDesabilitado}
            isLoading={loading}
          >
            Login
          </Button>
          <Button variant="link" colorScheme="blue" onClick={realizarCadastro}>
            Não tem uma conta? Realize o cadastro
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};
