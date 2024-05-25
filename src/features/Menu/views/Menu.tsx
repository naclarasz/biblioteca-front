import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Menu = () => {
  return (
    <Box
      w={["full", "md"]}
      p={[8, 10]}
      mt={[20, "10vh"]}
      mb={[20, "10vh"]}
      mx="auto"
      border={["none", "1px"]}
      borderColor={["", "gray.300"]}
      borderRadius={10}
    >
      <VStack spacing={4} align="flex-start" w="full">
        <VStack align="flex-start">
          <Heading>Sistema Bibliotecário</Heading>
          <Text fontSize="xl">Bem vindo, Fulano!</Text>
        </VStack>

        <Button rounded="none" colorScheme="blue" w="full">
          <Link to="/minha-reserva">Visualizar sua reserva</Link>
        </Button>
        <Button rounded="none" colorScheme="blue" w="full">
          <Link to="/dados-pessoais">Dados pessoais</Link>
        </Button>
      </VStack>
    </Box>
  );
};
