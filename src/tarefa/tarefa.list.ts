import { IPaginaHTML } from "../shared/pagina.interface";
import { IPaginaListagem } from "../shared/pagina.list.interface";
import { IRepositorio } from "../shared/repositorio.interface";
import { Tarefa } from "./models/tarefa.model.js";
import { TarefaRepositoryLocalStorage } from "./repositories/tarefa.repository.LocalStorage";

class TarefaPaginaListagem implements IPaginaHTML, IPaginaListagem{
  tabela: HTMLTableElement;

  constructor(private repositorioTarefas: IRepositorio<Tarefa>){
    this.configurarElementos();

    this.atualizarTabela();
  }

  configurarElementos(): void {
    this.tabela = document.getElementById("tabela") as HTMLTableElement;
  }
  
  atualizarTabela(): void {
    const tarefas = this.repositorioTarefas.selecionarTodos();

    let corpoTabela = this.tabela.getElementsByTagName("tbody")[0];

    tarefas.forEach(tarefa => {
      const novaLinha = corpoTabela.insertRow();

      Object.values(tarefa).forEach((valor: any) => {
        const novaCelula = novaLinha.insertCell();

        novaCelula.innerText = valor;
      });

      const celulaBotoes = novaLinha.insertCell();

      const btnEditar = document.createElement("a");
      btnEditar.innerText = "Editar";
      btnEditar.className = "btn btn-outline-success me-1";

      btnEditar.addEventListener("click", () => {
        const idSelecionado = novaLinha.cells[0].innerText;
        
        window.location.href = `tarefa.html?id=${idSelecionado}`;
      });

      const btnExcluir = document.createElement("a");
      btnExcluir.innerText = "Excluir";
      btnExcluir.className = "btn btn-outline-danger"

      btnExcluir.addEventListener("click", () => {
        const idSelecionado = tarefa.id;

        this.repositorioTarefas.excluir(idSelecionado);

        window.location.reload();
      });

      celulaBotoes.appendChild(btnEditar);
      celulaBotoes.appendChild(btnExcluir);
    })
  }
}
new TarefaPaginaListagem(new TarefaRepositoryLocalStorage());