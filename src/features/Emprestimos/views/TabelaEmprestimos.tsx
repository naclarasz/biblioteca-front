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
} from "@chakra-ui/react";
import { TipoEmprestimoEnum } from "../enums/EmprestimosEnums";

export const TabelaEmprestimos = ({
  tipoEmprestimo,
}: {
  tipoEmprestimo: TipoEmprestimoEnum;
}) => {
  const renderizarAcoes = () => {
    if (tipoEmprestimo === TipoEmprestimoEnum.A_VENCER) {
      return (
        <td>
          <HStack>
            <Button>Alterar data</Button>
            <Button>Concluir empréstimo</Button>
          </HStack>
        </td>
      );
    } else if (tipoEmprestimo === TipoEmprestimoEnum.VENCIDOS) {
      return (
        <td>
          <HStack>
            <Button>Alterar data</Button>
            <Button>Concluir empréstimo</Button>
          </HStack>
        </td>
      );
    } else {
      return null;
    }
  };

  return (
    <TableContainer minW="100%">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nome do livro</Th>
            <Th>Reponsável</Th>
            {tipoEmprestimo === TipoEmprestimoEnum.ENTREGUES ? (
              <Th>Entregue em</Th>
            ) : (
              <Th>Prazo</Th>
            )}
            {renderizarAcoes() && <Th>Ações</Th>}
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Nome do livro</Td>
            <Td>Ana</Td>
            <Td>01/01/2024</Td>
            {renderizarAcoes()}
          </Tr>
          <Tr>
            <Td>Nome do livro</Td>
            <Td>Ana</Td>
            <Td>01/01/2024</Td>
            {renderizarAcoes()}
          </Tr>
          <Tr>
            <Td>Nome do livro</Td>
            <Td>Ana</Td>
            <Td>01/01/2024</Td>
            {renderizarAcoes()}
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
