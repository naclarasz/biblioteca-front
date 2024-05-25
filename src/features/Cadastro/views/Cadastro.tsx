import { useEffect, useState } from "react";
import API from "../../../shared/api/api";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  RadioGroup,
  Select,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

interface IDadosCadastro {
  nome: string;
  endereco: string;
  telefone: string;
  email: string;
  idTipoUsuario: string;
  senha: string;
  status: number;
}

interface IDadosTipoUsuario {
  id: number;
  descricao: string;
}

export const Login = () => {
  const [dadosCadastro, setDadosCadastro] = useState<IDadosCadastro>({
    nome: "",
    endereco: "",
    telefone: "",
    email: "",
    idTipoUsuario: "",
    senha: "",
    status: 0,
  });
  const [tiposUsuario, setTiposUsuario] = useState<IDadosTipoUsuario[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    buscarListaTiposUsuario();
  }, []);

  const navegarLogin = () => {};

  const buscarListaTiposUsuario = async () => {
    try {
      setLoading(true);
      const resposta = await API.get("/TipoUsuario");
      setTiposUsuario(resposta.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const realizarCadastro = async () => {
    try {
      setLoading(true);
      await API.post("/Usuario", dadosCadastro);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const cadastroDeveEstarDesabilitado =
    !dadosCadastro.nome ||
    !dadosCadastro.endereco ||
    !dadosCadastro.telefone ||
    !dadosCadastro.email ||
    !dadosCadastro.idTipoUsuario ||
    !dadosCadastro.senha ||
    !dadosCadastro.status;

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
            <Text fontSize="xl">Realize o cadastro</Text>
          </VStack>

          <FormControl>
            <FormLabel>Nome:</FormLabel>
            <Input
              rounded="none"
              variant="filled"
              value={dadosCadastro.nome}
              onChange={(e) =>
                setDadosCadastro({
                  ...dadosCadastro,
                  nome: e.target.value,
                })
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel>E-mail:</FormLabel>
            <Input
              rounded="none"
              variant="filled"
              value={dadosCadastro.email}
              onChange={(e) =>
                setDadosCadastro({
                  ...dadosCadastro,
                  email: e.target.value,
                })
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel>Endereço:</FormLabel>
            <Input
              rounded="none"
              variant="filled"
              value={dadosCadastro.endereco}
              onChange={(e) =>
                setDadosCadastro({
                  ...dadosCadastro,
                  endereco: e.target.value,
                })
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel>Telefone:</FormLabel>
            <Input
              rounded="none"
              variant="filled"
              value={dadosCadastro.telefone}
              onChange={(e) =>
                setDadosCadastro({
                  ...dadosCadastro,
                  telefone: e.target.value,
                })
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel>Tipo de usuário:</FormLabel>
            <Select
              placeholder="Selecione o tipo de usuário"
              rounded="none"
              variant="filled"
              value={dadosCadastro.idTipoUsuario}
              onChange={(e) =>
                setDadosCadastro({
                  ...dadosCadastro,
                  idTipoUsuario: e.target.value,
                })
              }
            >
              {tiposUsuario?.map((tipo) => (
                <option value={tipo.id}>{tipo.descricao}</option>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Senha:</FormLabel>
            <Input
              rounded="none"
              variant="filled"
              type="password"
              value={dadosCadastro.senha}
              onChange={(e) =>
                setDadosCadastro({
                  ...dadosCadastro,
                  senha: e.target.value,
                })
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel>Status:</FormLabel>
            <RadioGroup
              value={dadosCadastro.status?.toString()}
              onChange={(valorSelecionado) => {
                setDadosCadastro({
                  ...dadosCadastro,
                  status: Number(valorSelecionado),
                });
              }}
            >
              <Stack direction="column">
                <Radio value="1">Ativo</Radio>
                <Radio value="2">Desativado</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>

          <Button
            rounded="none"
            colorScheme="blue"
            w="full"
            onClick={realizarCadastro}
            isDisabled={cadastroDeveEstarDesabilitado}
            isLoading={loading}
          >
            Cadastrar
          </Button>
          <Button variant="link" colorScheme="blue" onClick={navegarLogin}>
            Voltar para o login
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};
