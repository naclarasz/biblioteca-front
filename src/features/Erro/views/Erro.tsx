import { Box, Center, Heading, Text, VStack } from "@chakra-ui/react";

export const Erro = () => (
  <Center h="100%" w="calc(100vw)">
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
          <Heading>Oops!</Heading>
          <Text fontSize="xl">Desculpe, um erro inesperado aconteceu.</Text>
        </VStack>
      </VStack>
    </Box>
  </Center>
);
