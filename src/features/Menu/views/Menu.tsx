import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export const Menu = () => {
  const navigate = useNavigate();

  const fazerLogout = () => {
    navigate("/login");
  };

  return (
    <VStack spacing={4} align="flex-start" w="full">
      <VStack align="flex-start">
        <Heading>Sistema Bibliotecário</Heading>
        <Text fontSize="xl">Bem vindo, Fulano!</Text>
      </VStack>

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
      <Button
        leftIcon={<BsArrowLeft />}
        variant="link"
        colorScheme="red"
        onClick={fazerLogout}
      >
        Sair da conta
      </Button>
    </VStack>
  );
};
