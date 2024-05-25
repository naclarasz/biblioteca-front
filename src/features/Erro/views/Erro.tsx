import { Box, Heading, Text, VStack } from "@chakra-ui/react";

export const Erro = () => (
  <VStack spacing={4} align="flex-start" w="full">
    <VStack align="flex-start">
      <Heading>Oops!</Heading>
      <Text fontSize="xl">Desculpe, um erro inesperado aconteceu.</Text>
    </VStack>
  </VStack>
);
