import { Button, Heading, Text, VStack, useToast } from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { TiposUsuarioEnum, useAuth } from "../../../shared";

export const Menu = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { realizarLogout, dadosUsuarioLogado } = useAuth();

  const logout = () => {
    realizarLogout();
    navigate("/login", { replace: true });
    toast({
      title: "Você saiu da sua conta",
      status: "info",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

  const MenuAdmin = () => (
    <VStack align="flex-start" w="full" spacing={4}>
      <Button
        rounded="none"
        colorScheme="blue"
        w="full"
        onClick={() => {
          navigate("/emprestimos");
        }}
      >
        Empréstimos
      </Button>
      <Button
        rounded="none"
        colorScheme="blue"
        w="full"
        onClick={() => {
          navigate("/livros");
        }}
      >
        Livros
      </Button>
      <Button
        rounded="none"
        colorScheme="blue"
        w="full"
        onClick={() => {
          navigate("/alterar-status-usuario");
        }}
      >
        Alterar status de um usuário
      </Button>
    </VStack>
  );

  return (
    <VStack spacing={4} align="flex-start" w="full">
      <VStack align="flex-start">
        <Heading>Bibliotecad 📚</Heading>
        <Text fontSize="xl">Bem vindo(a), tenha uma boa leitura!</Text>
      </VStack>
      {dadosUsuarioLogado.idTipoUsuario === TiposUsuarioEnum.BIBLIOTECARIO &&
        MenuAdmin()}
      <VStack align="flex-start" w="full" spacing={4}>
        <Button
          rounded="none"
          colorScheme="blue"
          w="full"
          onClick={() => {
            navigate("/meus-emprestimos");
          }}
        >
          Meus empréstimos
        </Button>
      </VStack>
      <Button
        variant="link"
        colorScheme="blue"
        onClick={() => {
          navigate("/dados-pessoais");
        }}
      >
        Alterar dados pessoais
      </Button>
      <Button
        variant="link"
        colorScheme="blue"
        onClick={() => {
          navigate("/alterar-senha-usuario");
        }}
      >
        Alterar senha de acesso
      </Button>
      <Button
        leftIcon={<BsArrowLeft />}
        variant="link"
        colorScheme="red"
        onClick={logout}
      >
        Sair da conta
      </Button>
    </VStack>
  );
};
