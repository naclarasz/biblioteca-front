import {
  Button,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { TipoEmprestimoEnum } from "../enums/EmprestimosEnums";
import { ModalDataEmprestimo } from "./ModalDataEmprestimo";
import { IEmprestimo, formatarData } from "../../../shared";
import api from "../../../shared/api/api";
import { useState } from "react";

export const TabelaEmprestimos = ({
  tipoEmprestimo,
  emprestimos,
}: {
  tipoEmprestimo: TipoEmprestimoEnum;
  emprestimos: IEmprestimo[];
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const realizarEmprestimo = async (emprestimo: IEmprestimo) => {
    setLoading(true);
    try {
      const payload: IEmprestimo = {
        ...emprestimo,
        dataDevolucao: new Date(),
        devolvido: true,
      };
      await api.put("/Emprestimo/Editar", payload);
      toast({
        title: "Empréstimo concluído",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast({
        title: "Erro ao concluir empréstimo",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    setLoading(false);
  };

  const renderizarAcoes = (emprestimo?: IEmprestimo) => {
    if (tipoEmprestimo === TipoEmprestimoEnum.MEUS_EMPRESTIMOS) return null;
    if (tipoEmprestimo === TipoEmprestimoEnum.A_VENCER) {
      return (
        <td>
          <HStack>
            <Button onClick={onOpen}>Alterar data</Button>
            {emprestimo && (
              <Button
                onClick={() => realizarEmprestimo(emprestimo)}
                isLoading={loading}
              >
                Concluir empréstimo
              </Button>
            )}
          </HStack>
        </td>
      );
    } else if (tipoEmprestimo === TipoEmprestimoEnum.VENCIDOS) {
      return (
        <td>
          <HStack>
            <Button onClick={onOpen}>Alterar data</Button>
            {emprestimo && (
              <Button
                onClick={() => realizarEmprestimo(emprestimo)}
                isLoading={loading}
              >
                Concluir empréstimo
              </Button>
            )}
          </HStack>
        </td>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <TableContainer minW="100%">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID do livro</Th>
              {tipoEmprestimo !== TipoEmprestimoEnum.MEUS_EMPRESTIMOS ? (
                <Th>ID do responsável</Th>
              ) : (
                <Th>Data do empréstimo</Th>
              )}
              {tipoEmprestimo === TipoEmprestimoEnum.ENTREGUES ? (
                <Th>Entregue em</Th>
              ) : (
                <Th>Prazo de devolução</Th>
              )}
              {renderizarAcoes() && <Th>Ações</Th>}
              {tipoEmprestimo === TipoEmprestimoEnum.MEUS_EMPRESTIMOS && (
                <>
                  <Th>Devolvido</Th>
                  <Th>Entregue em</Th>
                </>
              )}
            </Tr>
          </Thead>
          <Tbody>
            {emprestimos?.map((emprestimo) => (
              <>
                <ModalDataEmprestimo
                  isOpen={isOpen}
                  onClose={onClose}
                  emprestimo={emprestimo}
                />
                <Tr key={emprestimo.idEmprestimo}>
                  <Td>{emprestimo.idLivro}</Td>
                  {tipoEmprestimo !== TipoEmprestimoEnum.MEUS_EMPRESTIMOS ? (
                    <Td>{emprestimo.idUsuarioEmp}</Td>
                  ) : (
                    <Td>{formatarData(emprestimo.dataEmprestimo)}</Td>
                  )}
                  <Td>
                    {tipoEmprestimo === TipoEmprestimoEnum.ENTREGUES
                      ? formatarData(emprestimo.dataDevolucao)
                      : formatarData(emprestimo.dataDevolucaoPrevista)}
                  </Td>
                  {tipoEmprestimo === TipoEmprestimoEnum.MEUS_EMPRESTIMOS && (
                    <>
                      <Td>{emprestimo.devolvido ? "Sim" : "Não"}</Td>
                      <Td>
                        {emprestimo.devolvido
                          ? formatarData(emprestimo.dataDevolucao)
                          : "-"}
                      </Td>
                    </>
                  )}
                  {renderizarAcoes(emprestimo)}
                </Tr>
              </>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
