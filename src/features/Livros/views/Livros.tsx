import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  HStack,
  Heading,
  Spinner,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { TabelaLivros } from "./TabelaLivros";
import { BsArrowLeft } from "react-icons/bs";
import { ModalNovoLivro } from "./ModalNovoLivro";
import api from "../../../shared/api/api";
import { IDadosLivro } from "../../../shared";

export const Livros = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [livros, setLivros] = useState<IDadosLivro[]>([]);

  const listarLivros = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/Livro/Listar");
      setLivros(res.data);
    } catch (error) {
      toast({
        title: "Erro ao listar livros",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      console.error(error);
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    listarLivros();
  }, [listarLivros]);

  return (
    <Box>
      <VStack spacing={4} align="flex-start" w="full">
        <Heading size="md">Livros</Heading>
        {loading ? (
          <Spinner size="xl" alignSelf="center" />
        ) : (
          <TabelaLivros livros={livros} />
        )}

        <HStack justifyContent="space-between" w="100%">
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
          <Button colorScheme="blue" onClick={onOpen}>
            Adicionar livro
          </Button>
        </HStack>
      </VStack>
      <ModalNovoLivro isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
