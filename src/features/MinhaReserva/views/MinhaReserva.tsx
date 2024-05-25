import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export const MinhaReserva = () => {
  const navigate = useNavigate();

  return (
    <VStack spacing={4} align="flex-start" w="full">
      <Card w="100%">
        <CardHeader>
          <Heading size="md">Minha reserva</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Livro
              </Heading>
              <Text pt="2" fontSize="sm">
                Nome do livro
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Data prevista de devolução
              </Heading>
              <Text pt="2" fontSize="sm">
                01/01/2024
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
      <Button
        leftIcon={<BsArrowLeft />}
        colorScheme="blue"
        variant="link"
        onClick={() => {
          navigate("/menu");
        }}
      >
        Voltar para o menu
      </Button>
    </VStack>
  );
};
