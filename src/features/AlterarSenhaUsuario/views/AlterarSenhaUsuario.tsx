import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../shared";
import api from "../../../shared/api/api";

export const AlterarSenhaUsuario = () => {
  const [senha, setSenha] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const { dadosUsuarioLogado } = useAuth();

  const navigate = useNavigate();

  const toast = useToast();

  const alterarSenha = async () => {
    setLoading(true);
    try {
      await api.put("/Usuario/EditarSenha", {
        idUsuario: dadosUsuarioLogado?.idUsuario,
        senha,
        novaSenha,
      });

      navigate("/");
      toast({
        title: "Senha alterada com sucesso",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Erro ao alterar senha",
        description: "Verifique se a senha atual está correta",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <VStack spacing={4} align="flex-start" w="full">
      <VStack align="flex-start">
        <Heading>Bibliotecad 📚</Heading>
        <Text fontSize="xl">Alterar sua senha</Text>
      </VStack>

      <FormControl>
        <FormLabel>Digite sua senha atual:</FormLabel>

        <Input
          type="password"
          rounded="none"
          variant="filled"
          placeholder="Digite sua senha atual"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Digite a nova senha:</FormLabel>

        <Input
          type="password"
          rounded="none"
          variant="filled"
          placeholder="Digite a nova senha"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
        />
      </FormControl>

      <Button
        rounded="none"
        colorScheme="blue"
        w="full"
        onClick={alterarSenha}
        isDisabled={!senha || !novaSenha}
        isLoading={loading}
      >
        Alterar senha
      </Button>
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
