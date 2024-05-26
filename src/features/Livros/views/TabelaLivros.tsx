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
import { IDadosLivro } from "../../../shared";
import { ModalEditarLivro } from "./ModalEditarLivro";

export const TabelaLivros = ({ livros }: { livros: IDadosLivro[] }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <TableContainer minW="100%">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID do livro</Th>
              <Th>Título</Th>
              <Th>Autor</Th>
              <Th>Editora</Th>
              <Th>Ano</Th>
              <Th>Gênero</Th>
              <Th>Cópias</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {livros?.map((livro) => (
              <>
                <Tr key={livro.idLivro}>
                  <Td>{livro.idLivro}</Td>
                  <Td>{livro.titulo}</Td>
                  <Td>{livro.autor}</Td>
                  <Td>{livro.editora}</Td>
                  <Td>{livro.anoPublicacao}</Td>
                  <Td>{livro.genero}</Td>
                  <Td>{livro.copias}</Td>
                  <Td>
                    <HStack>
                      <Button onClick={onOpen}>Editar</Button>
                    </HStack>
                  </Td>
                </Tr>
                <ModalEditarLivro
                  livro={livro}
                  isOpen={isOpen}
                  onClose={onClose}
                />
              </>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
