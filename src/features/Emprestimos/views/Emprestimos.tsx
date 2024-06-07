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
import { useEffect, useState } from "react";
import {
  IDadosEmprestimos,
  IDadosLivro,
  IDadosUsuario,
  IEmprestimo,
} from "../../../shared";
import api from "../../../shared/api/api";
import { ModalNovoEmprestimo } from "./ModalNovoEmprestimo";

interface ITabelaEmprestimos {
  emprestimosVencidos: IDadosEmprestimos[];
  emprestimosAVencer: IDadosEmprestimos[];
  emprestimosEntregues: IDadosEmprestimos[];
}

export const Emprestimos = () => {
  const navigate = useNavigate();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [loading, setLoading] = useState(false);

  const [dadosTabelaEmprestimos, setDadosTabelaEmprestimos] =
    useState<ITabelaEmprestimos>({
      emprestimosVencidos: [],
      emprestimosAVencer: [],
      emprestimosEntregues: [],
    });

  const listarDados = async () => {
    setLoading(true);
    try {
      const resUsuarios = await api.get("/Usuario/Listar");
      const resLivros = await api.get("/Livro/Listar");
      const resVencidos = await api.get("/Emprestimo/ListarVencidos");
      const resAVencer = await api.get("/Emprestimo/ListarPendentes");
      const resEntregues = await api.get("/Emprestimo/ListarEntregues");

      if (!resUsuarios.data || !resLivros.data) return;

      const emprestimosVencidos = resVencidos.data.map(
        (emprestimo: IEmprestimo) => {
          const usuario = (resUsuarios.data as IDadosUsuario[])?.find(
            (usuario) => usuario.idUsuario === emprestimo.idUsuarioEmp
          );
          const livro = (resLivros.data as IDadosLivro[])?.find(
            (livro) => livro.idLivro === emprestimo.idLivro
          );

          return {
            ...emprestimo,
            nomeUsuarioEmp: usuario?.nome,
            nomeLivro: livro?.titulo,
          } as IDadosEmprestimos;
        }
      );

      const emprestimosAVencer = resAVencer.data.map(
        (emprestimo: IEmprestimo) => {
          const usuario = (resUsuarios.data as IDadosUsuario[])?.find(
            (usuario) => usuario.idUsuario === emprestimo.idUsuarioEmp
          );
          const livro = (resLivros.data as IDadosLivro[])?.find(
            (livro) => livro.idLivro === emprestimo.idLivro
          );

          return {
            ...emprestimo,
            nomeUsuarioEmp: usuario?.nome,
            nomeLivro: livro?.titulo,
          } as IDadosEmprestimos;
        }
      );

      const emprestimosEntregues = resEntregues.data.map(
        (emprestimo: IEmprestimo) => {
          const usuario = (resUsuarios.data as IDadosUsuario[])?.find(
            (usuario) => usuario.idUsuario === emprestimo.idUsuarioEmp
          );
          const livro = (resLivros.data as IDadosLivro[])?.find(
            (livro) => livro.idLivro === emprestimo.idLivro
          );

          return {
            ...emprestimo,
            nomeUsuarioEmp: usuario?.nome,
            nomeLivro: livro?.titulo,
          } as IDadosEmprestimos;
        }
      );

      setDadosTabelaEmprestimos({
        emprestimosVencidos,
        emprestimosAVencer,
        emprestimosEntregues,
      });
    } catch (error) {
      toast({
        title: "Erro ao buscar empréstimos",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      console.error(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    listarDados();
  }, []);

  return (
    <Box>
      <VStack spacing={4} align="flex-start" w="full">
        <Heading size="md">Empréstimos</Heading>
        {loading ? (
          <Spinner size="xl" alignSelf="center" />
        ) : (
          <Tabs variant="enclosed">
            <TabList>
              <Tab>Penentes</Tab>
              <Tab>Vencidos</Tab>
              <Tab>Entregues</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                {dadosTabelaEmprestimos.emprestimosAVencer?.length > 0 ? (
                  <TabelaEmprestimos
                    tipoEmprestimo={TipoEmprestimoEnum.A_VENCER}
                    emprestimos={dadosTabelaEmprestimos.emprestimosAVencer}
                  />
                ) : (
                  <Text>Nenhum empréstimo pendente</Text>
                )}
              </TabPanel>
              <TabPanel>
                {dadosTabelaEmprestimos.emprestimosVencidos?.length > 0 ? (
                  <TabelaEmprestimos
                    tipoEmprestimo={TipoEmprestimoEnum.VENCIDOS}
                    emprestimos={dadosTabelaEmprestimos.emprestimosVencidos}
                  />
                ) : (
                  <Text>Nenhum empréstimo vencido</Text>
                )}
              </TabPanel>
              <TabPanel>
                {dadosTabelaEmprestimos.emprestimosEntregues?.length > 0 ? (
                  <TabelaEmprestimos
                    tipoEmprestimo={TipoEmprestimoEnum.ENTREGUES}
                    emprestimos={dadosTabelaEmprestimos.emprestimosEntregues}
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
