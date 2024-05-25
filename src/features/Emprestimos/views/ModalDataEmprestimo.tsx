import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";
import { IEmprestimo, formatarData } from "../../../shared";
import api from "../../../shared/api/api";

interface IEmprestimoAtualizar {
  idEmprestimo: number;
  idUsuarioEmp: number;
  idLivro: number;
  dataEmprestimo: string;
  dataDevolucao: string;
  dataDevolucaoPrevista: string;
  devolvido: boolean;
}

export const ModalDataEmprestimo = ({
  isOpen,
  onClose,
  emprestimo,
}: {
  isOpen: boolean;
  onClose: () => void;
  emprestimo: IEmprestimo;
}) => {
  const [loading, setLoading] = useState(false);
  const [novaData, setNovaData] = useState(
    formatarData(emprestimo.dataDevolucaoPrevista)
  );
  const [dataSalva, setDataSalva] = useState(
    formatarData(emprestimo.dataDevolucaoPrevista)
  );

  const botaoDesabilitado = novaData === dataSalva;

  const alterarDataPrazo = async () => {
    setLoading(true);
    try {
      const payload: IEmprestimoAtualizar = {
        ...emprestimo,
        dataDevolucaoPrevista: new Date(convertDate(novaData)).toISOString(),
        dataEmprestimo: new Date(emprestimo.dataEmprestimo).toISOString(),
        dataDevolucao: new Date(emprestimo.dataDevolucao).toISOString(),
      };
      console.log(payload);
      await api.put("/Emprestimo/Editar", payload);
      setDataSalva(novaData);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  //convert dd/mm/yyyy to yyyy-mm-dd
  const convertDate = (date: string) => {
    const [dia, mes, ano] = date.split("/");
    console.log(`${ano}-${mes}-${dia}`);
    return `${ano}-${mes}-${dia}`;
  };

  console.log(new Date(convertDate(novaData)).toISOString());

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Alterar data de prazo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <FormControl>
              <FormLabel>Data de empréstimo</FormLabel>
              <Input
                value={novaData}
                onChange={(e) => setNovaData(e.target.value)}
              />
            </FormControl>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={alterarDataPrazo}
            isDisabled={botaoDesabilitado}
            isLoading={loading}
          >
            Salvar
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
