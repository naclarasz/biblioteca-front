import { useEffect, useState } from "react";
import API from "../../../shared/api/api";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { TiposUsuarioEnum, useAuth } from "../../../shared";

interface IDadosCadastro {
  nome: string;
  endereco: string;
  telefone: string;
  email: string;
  idTipoUsuario: string;
  senha: string;
}

export const Cadastro = () => {
  const navigate = useNavigate();
  const [dadosCadastro, setDadosCadastro] = useState<IDadosCadastro>({
    nome: "",
    endereco: "",
    telefone: "",
    email: "",
    idTipoUsuario: "",
    senha: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const { dadosUsuarioLogado } = useAuth();

  useEffect(() => {
    if (dadosUsuarioLogado?.idUsuario) navigate("/");
  }, [dadosUsuarioLogado, navigate]);

  const navegarLogin = () => {
    navigate("/login");
  };

  const realizarCadastro = async () => {
    try {
      setLoading(true);
      await API.post("/Usuario/Cadastrar", dadosCadastro);
      navigate("/login");
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
    !dadosCadastro.senha;

  return (
    <VStack spacing={4} align="flex-start" w="full">
      <VStack align="flex-start">
        <Heading>Bibliotecad 📚</Heading>
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
          <option value={TiposUsuarioEnum.ALUNO}>Aluno</option>
          <option value={TiposUsuarioEnum.PROFESSOR}>Professor</option>
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
        <Link to="/login">Voltar para o login </Link>
      </Button>
    </VStack>
  );
};
