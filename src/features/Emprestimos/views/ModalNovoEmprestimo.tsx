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
  Select,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState, useCallback } from "react";
import api from "../../../shared/api/api";
import { IDadosLivro } from "../../../shared";

interface IEmprestimoCadastrar {
  idEmprestimo: number;
  idUsuarioEmp: number;
  idLivro: number;
  dataEmprestimo: string;
  dataDevolucao: string;
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
    dataDevolucao: "",
    dataDevolucaoPrevista: "",
    devolvido: false,
  });

  const toast = useToast();

  //TODO: Ajustar botao desabilitado
  const botaoDesabilitado = false;

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
      const resposta = await api.get("/Livro/Listar");
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
            <FormControl>
              <FormLabel>Nome:</FormLabel>
              <Select
                placeholder="Selecione o usuário"
                rounded="none"
                variant="filled"
                value={dadosEmprestimo.idUsuarioEmp}
                onChange={(e) =>
                  setDadosEmprestimo({
                    ...dadosEmprestimo,
                    idUsuarioEmp: Number(e.target.value),
                  })
                }
              >
                {usuarios?.map((usr) => (
                  <option value={usr.idUsuario}>{usr.nome}</option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Livro:</FormLabel>
              <Select
                placeholder="Selecione o livro"
                rounded="none"
                variant="filled"
                value={dadosEmprestimo.idLivro}
                onChange={(e) =>
                  setDadosEmprestimo({
                    ...dadosEmprestimo,
                    idLivro: Number(e.target.value),
                  })
                }
              >
                {livros?.map((livro) => (
                  <option value={livro.idLivro}>{livro.titulo}</option>
                ))}
              </Select>
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
