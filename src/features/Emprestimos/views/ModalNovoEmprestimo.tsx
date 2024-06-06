import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState, useCallback } from "react";
import api from "../../../shared/api/api";
import { IDadosLivro } from "../../../shared";
import { CUIAutoComplete, Item } from "chakra-ui-autocomplete";

interface IEmprestimoCadastrar {
  idEmprestimo: number;
  idUsuarioEmp: number;
  idLivro: number;
  dataEmprestimo: string;
  dataDevolucao: null;
  dataDevolucaoPrevista: string;
  devolvido: boolean;
}

interface IDadosUsuario {
  idUsuario: number;
  nome: string;
  endereco: string;
  telefone: string;
  email: string;
  idTipoUsuario: string;
  senha: string;
  status: number;
}

export const ModalNovoEmprestimo = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [usuarios, setUsuarios] = useState<IDadosUsuario[]>([]);
  const [livros, setLivros] = useState<IDadosLivro[]>([]);
  const [dadosEmprestimo, setDadosEmprestimo] = useState<IEmprestimoCadastrar>({
    idEmprestimo: 0,
    idUsuarioEmp: 0,
    idLivro: 0,
    dataEmprestimo: "",
    dataDevolucao: null,
    dataDevolucaoPrevista: "",
    devolvido: false,
  });

  const toast = useToast();

  //TODO: Ajustar botao desabilitado
  const botaoDesabilitado =
    !dadosEmprestimo.idUsuarioEmp ||
    !dadosEmprestimo.idLivro ||
    !dadosEmprestimo.dataDevolucaoPrevista;

  const carregarUsuarios = useCallback(async () => {
    try {
      const resposta = await api.get("/Usuario/Listar");
      setUsuarios(resposta.data);
    } catch (error) {
      toast({
        title: "Erro ao carregar usuários",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      console.log(error);
    }
  }, [toast]);

  const carregarLivros = useCallback(async () => {
    try {
      const resposta = await api.get("/Livro/ListarDisponiveis");
      setLivros(resposta.data);
    } catch (error) {
      toast({
        title: "Erro ao carregar livros",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      console.log(error);
    }
  }, [toast]);

  useEffect(() => {
    Promise.all([carregarUsuarios(), carregarLivros()]);
  }, [carregarLivros, carregarUsuarios]);

  const converterData = (date: string) => {
    const [dia, mes, ano] = date.split("/");
    return `${ano}-${mes}-${dia}`;
  };

  const cadastrarEmprestimo = async () => {
    setLoading(true);
    try {
      await api.post("/Emprestimo/Cadastrar", {
        ...dadosEmprestimo,
        dataDevolucaoPrevista: new Date(
          converterData(dadosEmprestimo.dataDevolucaoPrevista)
        ).toISOString(),
        dataEmprestimo: new Date().toISOString(),
        dataDevolucao: null,
      });
      onClose();
      toast({
        title: "Empréstimo cadastrado com sucesso",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast({
        title: "Erro ao cadastrar empréstimo",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Alterar data de prazo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="flex-start" w="full">
            <FormControl marginBottom="-8">
              <CUIAutoComplete
                disableCreateItem
                label="Usuário:"
                placeholder="Digite o nome do usuário"
                onSelectedItemsChange={(changes) => {
                  if (changes.selectedItems) {
                    setDadosEmprestimo({
                      ...dadosEmprestimo,
                      idUsuarioEmp: Number(
                        changes.selectedItems[changes.selectedItems.length - 1]
                          ?.value
                      ),
                    });
                  }
                }}
                items={usuarios.map((usr) => {
                  return {
                    value: usr.idUsuario.toString(),
                    label: usr.nome,
                  } as Item;
                })}
                selectedItems={
                  dadosEmprestimo.idUsuarioEmp
                    ? [
                        {
                          value: dadosEmprestimo.idUsuarioEmp.toString(),
                          label: usuarios.filter(
                            (usr) =>
                              usr.idUsuario === dadosEmprestimo.idUsuarioEmp
                          )[0].nome,
                        },
                      ]
                    : []
                }
              />
            </FormControl>

            <FormControl marginBottom="-8">
              <CUIAutoComplete
                disableCreateItem
                label="Livro:"
                placeholder="Digite o título do livro"
                onSelectedItemsChange={(changes) => {
                  if (changes.selectedItems) {
                    setDadosEmprestimo({
                      ...dadosEmprestimo,
                      idLivro: Number(
                        changes.selectedItems[changes.selectedItems.length - 1]
                          ?.value
                      ),
                    });
                  }
                }}
                items={livros.map((livro) => {
                  return {
                    value: livro.idLivro.toString(),
                    label: livro.titulo,
                  } as Item;
                })}
                selectedItems={
                  dadosEmprestimo.idLivro
                    ? [
                        {
                          value: dadosEmprestimo.idLivro.toString(),
                          label: livros.filter(
                            (livro) => livro.idLivro === dadosEmprestimo.idLivro
                          )[0].titulo,
                        },
                      ]
                    : []
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel>Data de devolução prevista:</FormLabel>
              <Input
                rounded="none"
                variant="filled"
                value={dadosEmprestimo.dataDevolucaoPrevista}
                onChange={(e) =>
                  setDadosEmprestimo({
                    ...dadosEmprestimo,
                    dataDevolucaoPrevista: e.target.value,
                  })
                }
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={cadastrarEmprestimo}
            isDisabled={botaoDesabilitado}
            isLoading={loading}
          >
            Salvar
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
