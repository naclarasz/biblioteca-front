import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../shared";

export const Menu = () => {
  const navigate = useNavigate();
  const { realizarLogout } = useAuth();

  const logout = () => {
    realizarLogout();
    navigate("/login", { replace: true });
  };

  const MenuUsuario = () => (
    <VStack align="flex-start" w="full" spacing={4}>
      <Button
        rounded="none"
        colorScheme="blue"
        w="full"
        onClick={() => {
          navigate("/minha-reserva");
        }}
      >
        Minha reserva
      </Button>
      <Button
        rounded="none"
        colorScheme="blue"
        w="full"
        onClick={() => {
          navigate("/dados-pessoais");
        }}
      >
        Dados pessoais
      </Button>
    </VStack>
  );

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
          navigate("/dados-pessoais");
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
      {MenuAdmin()}
      <Button variant="link" colorScheme="blue" onClick={() => {}}>
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
