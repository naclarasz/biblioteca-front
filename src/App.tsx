import { Route, Routes } from "react-router-dom";
import {
  AlterarStatusUsuario,
  Cadastro,
  DadosPessoais,
  Emprestimos,
  Erro,
  Login,
  Menu,
  MinhaReserva,
} from "./features";
import { ProtectedRoute } from "./shared/components/index.ts";
import { AuthProvider } from "./shared/index.ts";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Menu />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route
          path="/minha-reserva"
          element={
            <ProtectedRoute>
              <MinhaReserva />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/dados-pessoais"
          element={
            <ProtectedRoute>
              <DadosPessoais />
            </ProtectedRoute>
          }
        />
        <Route
          path="/emprestimos"
          element={
            <ProtectedRoute>
              <Emprestimos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/alterar-status-usuario"
          element={
            <ProtectedRoute>
              <AlterarStatusUsuario />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Erro />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
