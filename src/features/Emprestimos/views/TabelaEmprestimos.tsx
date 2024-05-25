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
import { IEmprestimo } from "../../../shared";

export const TabelaEmprestimos = ({
  tipoEmprestimo,
  emprestimos,
}: {
  tipoEmprestimo: TipoEmprestimoEnum;
  emprestimos: IEmprestimo[];
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const renderizarAcoes = () => {
    if (tipoEmprestimo === TipoEmprestimoEnum.A_VENCER) {
      return (
        <td>
          <HStack>
            <Button onClick={onOpen}>Alterar data</Button>
            <Button>Concluir empréstimo</Button>
          </HStack>
        </td>
      );
    } else if (tipoEmprestimo === TipoEmprestimoEnum.VENCIDOS) {
      return (
        <td>
          <HStack>
            <Button>Alterar data</Button>
            <Button onClick={onOpen}>Concluir empréstimo</Button>
          </HStack>
        </td>
      );
    } else {
      return null;
    }
  };

  const renderizarDataFormatada = (data: Date) => {
    return new Date(data).toLocaleDateString();
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
              <Tr key={emprestimo.idEmprestimo}>
                <Td>{emprestimo.idLivro}</Td>
                <Td>{emprestimo.idUsuarioEmp}</Td>
                <Td>
                  {tipoEmprestimo === TipoEmprestimoEnum.ENTREGUES
                    ? renderizarDataFormatada(emprestimo.dataDevolucao)
                    : renderizarDataFormatada(emprestimo.dataDevolucaoPrevista)}
                </Td>
                {renderizarAcoes()}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <ModalDataEmprestimo isOpen={isOpen} onClose={onClose} />
    </>
  );
};
