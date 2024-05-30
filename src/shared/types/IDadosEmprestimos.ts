import { IEmprestimo } from "./IEmprestimo";

export interface IDadosEmprestimos extends IEmprestimo {
  nomeLivro: string;
  nomeUsuarioEmp: string;
}
