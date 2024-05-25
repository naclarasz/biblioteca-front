import {
  Box,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
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
        <Text fontSize="xl">Empréstimos</Text>
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
