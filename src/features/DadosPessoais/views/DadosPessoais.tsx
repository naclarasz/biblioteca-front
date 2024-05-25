import { useEffect, useState } from "react";
import API from "../../../shared/api/api";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

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

export const DadosPessoais = () => {
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

  const navigate = useNavigate();

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

  const atualizarCadastro = async () => {
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