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
import { useState } from "react";
import api from "../../../shared/api/api";
import { IDadosLivro } from "../../../shared";

export const ModalEditarLivro = ({
  livro,
  isOpen,
  onClose,
}: {
  livro: IDadosLivro;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [dadosLivro, setDadosLivro] = useState<IDadosLivro>(livro);

  const editarLivro = async () => {
    setLoading(true);
    try {
      await api.put(`/Livro/Editar`, dadosLivro);
      toast({
        title: "Livro editado com sucesso",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      onClose();
      window.location.reload();
    } catch (error) {
      toast({
        title: "Erro ao editar livro",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      console.error(error);
    }
    setLoading(false);
  };

  const botaoDesabilitado =
    !dadosLivro.titulo ||
    !dadosLivro.autor ||
    !dadosLivro.editora ||
    !dadosLivro.anoPublicacao ||
    !dadosLivro.genero ||
    !dadosLivro.copias;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar dados do livro</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="flex-start" w="full">
            <FormControl>
              <FormLabel>Título do livro:</FormLabel>
              <Input
                rounded="none"
                variant="filled"
                value={dadosLivro.titulo}
                onChange={(e) =>
                  setDadosLivro({
                    ...dadosLivro,
                    titulo: e.target.value,
                  })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel>Autor:</FormLabel>
              <Input
                rounded="none"
                variant="filled"
                value={dadosLivro.autor}
                onChange={(e) =>
                  setDadosLivro({
                    ...dadosLivro,
                    autor: e.target.value,
                  })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel>Editora:</FormLabel>
              <Input
                rounded="none"
                variant="filled"
                value={dadosLivro.editora}
                onChange={(e) =>
                  setDadosLivro({
                    ...dadosLivro,
                    editora: e.target.value,
                  })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel>Ano de publicação:</FormLabel>
              <Input
                type="number"
                rounded="none"
                variant="filled"
                value={dadosLivro.anoPublicacao}
                onChange={(e) =>
                  setDadosLivro({
                    ...dadosLivro,
                    anoPublicacao: Number(e.target.value),
                  })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel>Gênero:</FormLabel>
              <Input
                rounded="none"
                variant="filled"
                value={dadosLivro.genero}
                onChange={(e) =>
                  setDadosLivro({
                    ...dadosLivro,
                    genero: e.target.value,
                  })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel>Cópias:</FormLabel>
              <Input
                type="number"
                rounded="none"
                variant="filled"
                value={dadosLivro.copias}
                onChange={(e) =>
                  setDadosLivro({
                    ...dadosLivro,
                    copias: Number(e.target.value),
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
            onClick={editarLivro}
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
