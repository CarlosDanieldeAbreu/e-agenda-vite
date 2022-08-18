import { IPaginaFormulario } from "../shared/pagina.create.interface";
import { IPaginaHTML } from "../shared/pagina.interface";
import { IRepositorio } from "../shared/repositorio.interface";
import { Prioridade } from "./models/prioridade.enum";
import { Tarefa } from "./models/tarefa.model";
import { TarefaRepositoryLocalStorage } from "./repositories/tarefa.repository.LocalStorage";

class TarefaPaginaCadastro implements IPaginaHTML, IPaginaFormulario {
  private txtDescricao: HTMLInputElement;
  private selectPrioridade: HTMLSelectElement;
  private btnSalvar: HTMLButtonElement;

  private idSelecionado: string;

  constructor(private repositorioTarefas: IRepositorio<Tarefa>, id?: string) {

    this.configurarElementos();
    if(id){
      this.idSelecionado = id;

      const tarefaSelecionada = this.repositorioTarefas.selecionarPorId(id);

      if(tarefaSelecionada)
        this.preencherFormulario(tarefaSelecionada);
    }
  }

  private preencherFormulario(tarefaSelecionada: Tarefa){
    this.txtDescricao.value = tarefaSelecionada.descricao;
    this.selectPrioridade = document.getElementById('inputGroupSelectCategoria') as HTMLSelectElement;
    switch(tarefaSelecionada.prioridade){
      case Prioridade.Baixa: this.selectPrioridade.selectedIndex = 0; break;
      case Prioridade.Normal: this.selectPrioridade.selectedIndex = 1; break;
      case Prioridade.Alta: this.selectPrioridade.selectedIndex = 2; break;
    }
  }

  configurarElementos(): void {
    this.txtDescricao = document.getElementById("titulo") as HTMLInputElement;
    this.btnSalvar = document.getElementById("btnSalvar") as HTMLButtonElement;
    this.btnSalvar.addEventListener("click", (_evt) => this.gravarRegistros());
  }
  
  gravarRegistros(): void {
    const tarefa = this.obterDadosFormulario();

    if (!this.idSelecionado)
      this.repositorioTarefas.inserir(tarefa);
    else
      this.repositorioTarefas.editar(tarefa.id, tarefa);
    
    window.location.href = "tarefa.html";
  }

  private obterDadosFormulario(): Tarefa {
    const descricao = this.txtDescricao.value;
    const prioridade = this.obterPrioridadeSelecionada();

    let tarefa = null;
    
    if (!this.idSelecionado)
      tarefa = new Tarefa(descricao, prioridade);
    else
      tarefa = new Tarefa(descricao, prioridade, this.idSelecionado);

    return tarefa;
  }

  private obterPrioridadeSelecionada(): Prioridade {
    this.selectPrioridade = document.getElementById('inputGroupSelectCategoria') as HTMLSelectElement;
    this.selectPrioridade.options[this.selectPrioridade.selectedIndex].value;

    return this.selectPrioridade.value as Prioridade;
  }
}

const pararms = new URLSearchParams(window.location.search);
const id = pararms.get("id") as string;
new TarefaPaginaCadastro(new TarefaRepositoryLocalStorage(), id);