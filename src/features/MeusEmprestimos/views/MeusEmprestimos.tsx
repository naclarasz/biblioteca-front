import {
  Button,
  Heading,
  Spinner,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import api from "../../../shared/api/api";
import {
  IDadosEmprestimos,
  IDadosLivro,
  IDadosUsuario,
  IEmprestimo,
  useAuth,
} from "../../../shared";
import { useEffect, useState } from "react";
import { TabelaEmprestimos } from "../../Emprestimos/views/TabelaEmprestimos";
import { TipoEmprestimoEnum } from "../../Emprestimos/enums/EmprestimosEnums";

export const MeusEmprestimos = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { dadosUsuarioLogado } = useAuth();

  const [loading, setLoading] = useState(false);
  const [dadosEmprestimos, setDadosEmprestimos] = useState<IDadosEmprestimos[]>(
    []
  );

  const listarDados = async () => {
    setLoading(true);
    try {
      const resUsuarios = await api.get("/Usuario/Listar");
      const resLivros = await api.get("/Livro/Listar");
      const resEmprestimos = await api.get("/Emprestimo/Listar");

      const usuarios = resUsuarios.data as IDadosUsuario[];
      const livros = resLivros.data as IDadosLivro[];
      const emprestimos = resEmprestimos.data as IEmprestimo[];

      if (!usuarios || !livros || !emprestimos) return;

      const meusEmprestimos = emprestimos.filter(
        (e) => e.idUsuarioEmp === dadosUsuarioLogado.idUsuario
      );

      const empTodos = meusEmprestimos.map((emp) => {
        const nomeLivro = livros.find(
          (livro) => livro.idLivro === emp.idLivro
        )?.titulo;
        const nomeUsuarioEmp = usuarios.find(
          (usuario) => usuario.idUsuario === emp.idUsuarioEmp
        )?.nome;
        return {
          ...emp,
          nomeLivro,
          nomeUsuarioEmp,
        } as IDadosEmprestimos;
      });

      setDadosEmprestimos(empTodos);
    } catch (error) {
      toast({
        title: "Erro ao listar meus empréstimos",
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

  const renderizarTabela = () => {
    if (loading) return <Spinner size="xl" alignSelf="center" />;

    if (dadosEmprestimos.length === 0)
      return <Text>Nenhum empréstimo encontrado</Text>;

    return (
      <TabelaEmprestimos
        emprestimos={dadosEmprestimos}
        tipoEmprestimo={TipoEmprestimoEnum.MEUS_EMPRESTIMOS}
      />
    );
  };

  return (
    <VStack spacing={4} align="flex-start" w="full">
      <Heading size="md">Meus empréstimos</Heading>
      {renderizarTabela()}
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
  );
};
