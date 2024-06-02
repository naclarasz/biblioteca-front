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
import { IDadosEmprestimos, IEmprestimo, formatarData } from "../../../shared";
import api from "../../../shared/api/api";
import { useState } from "react";
import React from "react";

export const TabelaEmprestimos = ({
  tipoEmprestimo,
  emprestimos,
}: {
  tipoEmprestimo: TipoEmprestimoEnum;
  emprestimos: IDadosEmprestimos[];
}) => {
  const [modalState, setModalState] = useState([{}]);

  const onOpenModal = (id: number) => {
    setModalState((prev) => ({ ...prev, [id]: true }));
  };
  const onCloseModal = (id: number) => {
    setModalState((prev) => ({ ...prev, [id]: false }));
  };

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
    switch (tipoEmprestimo) {
      case TipoEmprestimoEnum.A_VENCER:
      case TipoEmprestimoEnum.VENCIDOS:
        return (
          <td>
            <HStack>
              <Button onClick={() => emprestimo ? onOpenModal(emprestimo.idEmprestimo) : null} size="sm">
                Alterar data de devolução prevista
              </Button>
              {emprestimo && (
                <Button
                  onClick={() => realizarEmprestimo(emprestimo)}
                  isLoading={loading}
                  size="sm"
                >
                  Concluir empréstimo
                </Button>
              )}
            </HStack>
          </td>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <TableContainer minW="100%">
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Título do livro</Th>
              {tipoEmprestimo !== TipoEmprestimoEnum.MEUS_EMPRESTIMOS ? (
                <Th>Nome do responsável</Th>
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
            {emprestimos.map((emprestimo) => (                 
              <>
                <React.Fragment key={emprestimo.idEmprestimo}/>
                <ModalDataEmprestimo
                  isOpen={!!modalState[emprestimo.idEmprestimo]}
                  onClose={() => onCloseModal(emprestimo.idEmprestimo)}
                  emprestimo={emprestimo}
                />
                <Tr key={emprestimo.idEmprestimo}>
                  <Td>{emprestimo.nomeLivro}</Td>
                  {tipoEmprestimo !== TipoEmprestimoEnum.MEUS_EMPRESTIMOS ? (
                    <Td>{emprestimo.nomeUsuarioEmp}</Td>
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
