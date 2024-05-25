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
import { TipoEmprestimoEnum } from "../enums/EmprestimosEnums";
import { useEffect, useState } from "react";
import { IEmprestimo } from "../../../shared";
import api from "../../../shared/api/api";

export const Emprestimos = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [emprestimosVencidos, setEmprestimosVencidos] = useState<IEmprestimo[]>(
    []
  );
  const [emprestimosAVencer, setEmprestimosAVencer] = useState<IEmprestimo[]>(
    []
  );
  const [emprestimosEntregues, setEmprestimosEntregues] = useState<
    IEmprestimo[]
  >([]);

  useEffect(() => {
    listarTodosEmprestimos();
  }, []);

  const listarEmprestimosVencidos = async () => {
    try {
      const res = await api.get("/Emprestimo/ListarVencidos");
      setEmprestimosVencidos(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const listarEmprestimosAVencer = async () => {
    try {
      const res = await api.get("/Emprestimo/ListarPendentes");
      setEmprestimosAVencer(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const listarEmprestimosEntregues = async () => {
    try {
      const res = await api.get("/Emprestimo/ListarEntregues");
      setEmprestimosEntregues(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const listarTodosEmprestimos = async () => {
    setLoading(true);
    Promise.all([
      listarEmprestimosVencidos(),
      listarEmprestimosAVencer(),
      listarEmprestimosEntregues(),
    ]).finally(() => {
      setLoading(false);
    });
  };

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
              {emprestimosAVencer && (
                <TabelaEmprestimos
                  tipoEmprestimo={TipoEmprestimoEnum.A_VENCER}
                  emprestimos={emprestimosAVencer}
                />
              )}
            </TabPanel>
            <TabPanel>
              {emprestimosVencidos && (
                <TabelaEmprestimos
                  tipoEmprestimo={TipoEmprestimoEnum.VENCIDOS}
                  emprestimos={emprestimosVencidos}
                />
              )}
            </TabPanel>
            <TabPanel>
              {emprestimosEntregues && (
                <TabelaEmprestimos
                  tipoEmprestimo={TipoEmprestimoEnum.ENTREGUES}
                  emprestimos={emprestimosEntregues}
                />
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
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
      </VStack>
    </Box>
  );
};
