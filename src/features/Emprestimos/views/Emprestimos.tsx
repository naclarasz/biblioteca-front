import {
  Box,
  Button,
  HStack,
  Heading,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { TabelaEmprestimos } from "./TabelaEmprestimos";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { TipoEmprestimoEnum } from "../enums/EmprestimosEnums";
import { useCallback, useEffect, useState } from "react";
import { IEmprestimo } from "../../../shared";
import api from "../../../shared/api/api";
import { ModalNovoEmprestimo } from "./ModalNovoEmprestimo";

export const Emprestimos = () => {
  const navigate = useNavigate();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const toast = useToast();

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

  const listarEmprestimosVencidos = useCallback(async () => {
    try {
      const res = await api.get("/Emprestimo/ListarVencidos");
      setEmprestimosVencidos(res.data);
    } catch (error) {
      toast({
        title: "Erro ao listar empréstimos vencidos",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      console.error(error);
    }
  }, [toast]);

  const listarEmprestimosAVencer = useCallback(async () => {
    try {
      const res = await api.get("/Emprestimo/ListarPendentes");
      setEmprestimosAVencer(res.data);
    } catch (error) {
      toast({
        title: "Erro ao listar empréstimos a vencer",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      console.error(error);
    }
  }, [toast]);

  const listarEmprestimosEntregues = useCallback(async () => {
    try {
      const res = await api.get("/Emprestimo/ListarEntregues");
      setEmprestimosEntregues(res.data);
    } catch (error) {
      toast({
        title: "Erro ao listar empréstimos entregues",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      console.error(error);
    }
  }, [toast]);

  const listarTodosEmprestimos = useCallback(async () => {
    setLoading(true);
    Promise.all([
      listarEmprestimosVencidos(),
      listarEmprestimosAVencer(),
      listarEmprestimosEntregues(),
    ]).finally(() => {
      setLoading(false);
    });
  }, [
    listarEmprestimosVencidos,
    listarEmprestimosAVencer,
    listarEmprestimosEntregues,
  ]);

  useEffect(() => {
    listarTodosEmprestimos();
  }, [listarTodosEmprestimos]);

  return (
    <Box>
      <VStack spacing={4} align="flex-start" w="full">
        <Heading size="md">Empréstimos</Heading>
        {loading ? (
          <Spinner size="xl" alignSelf="center" />
        ) : (
          <Tabs variant="enclosed">
            <TabList>
              <Tab>A vencer</Tab>
              <Tab>Vencidos</Tab>
              <Tab>Entregues</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                {emprestimosAVencer?.length > 0 ? (
                  <TabelaEmprestimos
                    tipoEmprestimo={TipoEmprestimoEnum.A_VENCER}
                    emprestimos={emprestimosAVencer}
                  />
                ) : (
                  <Text>Nenhum empréstimo a vencer</Text>
                )}
              </TabPanel>
              <TabPanel>
                {emprestimosVencidos?.length > 0 ? (
                  <TabelaEmprestimos
                    tipoEmprestimo={TipoEmprestimoEnum.VENCIDOS}
                    emprestimos={emprestimosVencidos}
                  />
                ) : (
                  <Text>Nenhum empréstimo vencido</Text>
                )}
              </TabPanel>
              <TabPanel>
                {emprestimosEntregues?.length > 0 ? (
                  <TabelaEmprestimos
                    tipoEmprestimo={TipoEmprestimoEnum.ENTREGUES}
                    emprestimos={emprestimosEntregues}
                  />
                ) : (
                  <Text>Nenhum empréstimo entregue</Text>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
        <HStack justifyContent="space-between" w="100%">
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
          <Button colorScheme="blue" onClick={onOpen}>
            Adicionar empréstimo
          </Button>
        </HStack>
      </VStack>
      <ModalNovoEmprestimo isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
