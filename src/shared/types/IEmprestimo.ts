export interface IEmprestimo {
  idEmprestimo: number;
  idUsuarioEmp: number;
  idLivro: number;
  dataEmprestimo: Date;
  dataDevolucao: Date;
  dataDevolucaoPrevista: Date;
  devolvido: boolean;
}
