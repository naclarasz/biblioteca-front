import { Button, Heading, Spinner, VStack, useToast } from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import api from "../../../shared/api/api";
import { IEmprestimo, useAuth } from "../../../shared";
import { useCallback, useEffect, useState } from "react";
import { TabelaEmprestimos } from "../../Emprestimos/views/TabelaEmprestimos";
import { TipoEmprestimoEnum } from "../../Emprestimos/enums/EmprestimosEnums";

export const MeusEmprestimos = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { dadosUsuarioLogado } = useAuth();

  const [meusEmprestimos, setMeusEmprestimos] = useState<IEmprestimo[]>([]);
  const [loading, setLoading] = useState(false);

  const listarMeusEmprestimos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(`/Emprestimo/Listar`);

      const emprestimos = res.data as IEmprestimo[];
      const meusEmprestimos = emprestimos.filter(
        (e) => e.idUsuarioEmp === dadosUsuarioLogado.idUsuario
      );

      setMeusEmprestimos(meusEmprestimos);
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
  }, [dadosUsuarioLogado.idUsuario, toast]);

  useEffect(() => {
    listarMeusEmprestimos();
  }, [listarMeusEmprestimos]);

  console.log(meusEmprestimos);

  return (
    <VStack spacing={4} align="flex-start" w="full">
      <Heading size="md">Meus empréstimos</Heading>
      {loading ? (
        <Spinner size="xl" alignSelf="center" />
      ) : (
        <TabelaEmprestimos
          emprestimos={meusEmprestimos}
          tipoEmprestimo={TipoEmprestimoEnum.MEUS_EMPRESTIMOS}
        />
      )}
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
