import { useCallback, useEffect, useState } from "react";
import API from "../../../shared/api/api";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { useAuth } from "../../../shared";

interface IDadosCadastro {
  nome: string;
  endereco: string;
  telefone: string;
  email: string;
  idTipoUsuario: string;
  status: number;
}

export const DadosPessoais = () => {
  const { dadosUsuarioLogado } = useAuth();
  const [dadosCadastro, setDadosCadastro] = useState<IDadosCadastro>({
    nome: "",
    endereco: "",
    telefone: "",
    email: "",
    idTipoUsuario: "",
    status: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const buscarDadosUsuario = useCallback(async () => {
    try {
      setLoading(true);
      const resposta = await API.get(
        `/Usuario/Obter/${dadosUsuarioLogado.idUsuario}`
      );
      setDadosCadastro(resposta.data);
    } catch (e) {
      console.error(e);
      toast({
        title: "Erro ao buscar os dados do usuário",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }, [dadosUsuarioLogado.idUsuario, toast]);

  useEffect(() => {
    Promise.all([buscarDadosUsuario()]);
  }, [buscarDadosUsuario]);

  const navigate = useNavigate();

  const atualizarCadastro = async () => {
    try {
      setLoading(true);
      await API.put("/Usuario/Editar", dadosCadastro);
      toast({
        title: "Cadastro atualizado com sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (e) {
      console.error(e);
      toast({
        title: "Erro ao atualizar o cadastro",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const cadastroDeveEstarDesabilitado =
    !dadosCadastro.nome ||
    !dadosCadastro.endereco ||
    !dadosCadastro.telefone ||
    !dadosCadastro.email;

  return (
    <VStack spacing={4} align="flex-start" w="full">
      <Heading size="md">Atualize seus dados</Heading>

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

      <Button
        rounded="none"
        colorScheme="blue"
        w="full"
        onClick={atualizarCadastro}
        isDisabled={cadastroDeveEstarDesabilitado}
        isLoading={loading}
      >
        Salvar
      </Button>
      <Button
        leftIcon={<BsArrowLeft />}
        variant="link"
        colorScheme="blue"
        onClick={() => {
          navigate("/");
        }}
      >
        <Link to="/login">Voltar para o menu </Link>
      </Button>
    </VStack>
  );
};
