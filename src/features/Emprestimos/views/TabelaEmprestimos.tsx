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

  const realizarEmprestimo = async (emprestimo: IEmprestimo) => {
    setLoading(true);
    try {
      const payload: IEmprestimo = {
        ...emprestimo,
        dataDevolucao: new Date(),
        devolvido: true,
      };
      await api.put("/Emprestimo/Editar", payload);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const renderizarAcoes = (emprestimo?: IEmprestimo) => {
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
              <Th>ID do responsável</Th>
              {tipoEmprestimo === TipoEmprestimoEnum.ENTREGUES ? (
                <Th>Entregue em</Th>
              ) : (
                <Th>Prazo</Th>
              )}
              {renderizarAcoes() && <Th>Ações</Th>}
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
                  <Td>{emprestimo.idUsuarioEmp}</Td>
                  <Td>
                    {tipoEmprestimo === TipoEmprestimoEnum.ENTREGUES
                      ? formatarData(emprestimo.dataDevolucao)
                      : formatarData(emprestimo.dataDevolucaoPrevista)}
                  </Td>
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
