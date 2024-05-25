import {
  Box,
  Button,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import { TabelaEmprestimos } from "./TabelaEmprestimos";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

export const Emprestimos = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <VStack spacing={4} align="flex-start" w="full">
        <Heading size="md">Empréstimos</Heading>
        <Tabs variant="enclosed">
          <TabList>
            <Tab>A vencer</Tab>
            <Tab>Vencidos</Tab>
            <Tab>Entregues</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <TabelaEmprestimos />
            </TabPanel>
            <TabPanel>
              <TabelaEmprestimos />
            </TabPanel>
            <TabPanel>
              <TabelaEmprestimos />
            </TabPanel>
          </TabPanels>
        </Tabs>
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
    </Box>
  );
};
