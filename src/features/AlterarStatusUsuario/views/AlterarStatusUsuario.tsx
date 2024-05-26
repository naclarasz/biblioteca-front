import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Radio,
  RadioGroup,
  Select,
  Stack,
  VStack,
  useToast,
} from "@chakra-ui/react";
import api from "../../../shared/api/api";
import { useEffect, useState } from "react";
import { IDadosUsuario } from "../../../shared";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

interface IDadosUsuarioStatus extends IDadosUsuario {
  status: number;
}

export const AlterarStatusUsuario = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [usuarios, setUsuarios] = useState<IDadosUsuarioStatus[]>([]);
  const [dadosUsuario, setDadosUsuario] = useState<IDadosUsuarioStatus | null>(
    null
  );
  const [status, setStatus] = useState<number>(0);

  const toast = useToast();

  useEffect(() => {
    listarTodosUsuarios();
  }, []);

  const listarTodosUsuarios = async () => {
    try {
      const res = await api.get("/Usuario/Listar");
      setUsuarios(res.data);
    } catch (error) {
      toast({
        title: "Erro ao listar usuários",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      console.error(error);
    }
  };

  const alterarStatusUsuario = async () => {
    if (!dadosUsuario) return;
    setLoading(true);
    try {
      await api.put("/Usuario/Editar", {
        ...dadosUsuario,
        status: status,
      });
      toast({
        title: "Status do usuário alterado com sucesso",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Erro ao alterar status do usuário",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      console.error(error);
    }
    setLoading(false);
  };

  const onChangeUsuario = (idUsuario: number) => {
    const usuarioSelecionado = usuarios.find(
      (usuario) => usuario.idUsuario === idUsuario
    );
    if (usuarioSelecionado) {
      setDadosUsuario(usuarioSelecionado);
    }
  };

  return (
    usuarios && (
      <VStack spacing={4} align="flex-start" w="full">
        <VStack align="flex-start">
          <Heading size="md">Alterar o status de um usuário</Heading>
        </VStack>

        <FormControl>
          <FormLabel>Usuário:</FormLabel>

          <Select
            placeholder="Selecione o  usuário"
            rounded="none"
            variant="filled"
            value={dadosUsuario?.idUsuario}
            onChange={(e) => {
              onChangeUsuario(Number(e.target.value));
            }}
          >
            {usuarios?.map((usuario) => (
              <option key={usuario.idUsuario} value={usuario.idUsuario}>
                {usuario.nome}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Status:</FormLabel>
          <RadioGroup
            isDisabled={!dadosUsuario}
            value={status.toString()}
            onChange={(valorSelecionado) => {
              setStatus(Number(valorSelecionado));
            }}
          >
            <Stack direction="column">
              <Radio value="1">Ativo</Radio>

              <Radio value="0">Inativo</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        <Button
          rounded="none"
          colorScheme="blue"
          w="full"
          onClick={alterarStatusUsuario}
          isDisabled={!dadosUsuario}
          isLoading={loading}
        >
          Alterar Status
        </Button>
        <Button
          leftIcon={<BsArrowLeft />}
          colorScheme="blue"
          variant="link"
          onClick={() => {
            navigate("/");
          }}
        >
          Voltar para o menu
        </Button>
      </VStack>
    )
  );
};
