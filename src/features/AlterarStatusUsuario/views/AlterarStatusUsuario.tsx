import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Select,
  VStack,
  useToast,
} from "@chakra-ui/react";
import api from "../../../shared/api/api";
import { useCallback, useEffect, useState } from "react";
import { IDadosUsuario, TiposUsuarioEnum } from "../../../shared";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { CUIAutoComplete, Item } from "chakra-ui-autocomplete";

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

  const toast = useToast();

  const listarTodosUsuarios = useCallback(async () => {
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
  }, [toast]);

  useEffect(() => {
    listarTodosUsuarios();
  }, [listarTodosUsuarios]);

  const alterarStatusUsuario = async () => {
    if (!dadosUsuario) return;
    setLoading(true);
    try {
      await api.put("/Usuario/Editar", dadosUsuario);
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
          <Heading size="md">Alterar o status/tipo de um usuário</Heading>
        </VStack>

        <FormControl marginBottom="-8">
          <CUIAutoComplete
            disableCreateItem
            label="Usuário:"
            placeholder="Digite o nome do usuário"
            onSelectedItemsChange={(changes) => {
              console.log(changes.selectedItems);
              if (changes.selectedItems?.length) {
                onChangeUsuario(
                  Number(
                    changes.selectedItems[changes.selectedItems.length - 1]
                      ?.value
                  )
                );
              } else {
                setDadosUsuario(null);
              }
            }}
            items={usuarios.map((usr) => {
              return {
                value: usr.idUsuario.toString(),
                label: usr.nome,
              } as Item;
            })}
            selectedItems={
              dadosUsuario?.idUsuario
                ? [
                    {
                      value: dadosUsuario.idUsuario.toString(),
                      label: usuarios.filter(
                        (usr) => usr.idUsuario === dadosUsuario.idUsuario
                      )[0].nome,
                    },
                  ]
                : []
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel>Tipo de usuário:</FormLabel>
          <Select
            placeholder="Selecione o tipo de usuário"
            rounded="none"
            variant="filled"
            isDisabled={!dadosUsuario}
            value={dadosUsuario?.idTipoUsuario}
            onChange={(e) => {
              if (dadosUsuario) {
                setDadosUsuario({
                  ...dadosUsuario,
                  idTipoUsuario: Number(e.target.value),
                });
              }
            }}
          >
            <option value={TiposUsuarioEnum.ALUNO}>Aluno</option>
            <option value={TiposUsuarioEnum.PROFESSOR}>Professor</option>
            <option value={TiposUsuarioEnum.BIBLIOTECARIO}>
              Bibliotecário
            </option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Status:</FormLabel>
          <Select
            placeholder="Selecione o status do usuário"
            rounded="none"
            variant="filled"
            isDisabled={!dadosUsuario}
            value={dadosUsuario?.status}
            onChange={(e) => {
              if (dadosUsuario) {
                setDadosUsuario({
                  ...dadosUsuario,
                  status: Number(e.target.value),
                });
              }
            }}
          >
            <option value={1}>Ativo</option>
            <option value={0}>Desativado</option>
          </Select>
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
