import { IRepositorio } from "../../shared/repositorio.interface";
import { IRepositorioSerializavel } from "../../shared/repositorioSerializavel.Interface";
import { Tarefa } from "../models/tarefa.model";

export class TarefaRepositoryLocalStorage implements IRepositorio<Tarefa>, IRepositorioSerializavel{
  private readonly localStorage: Storage;

  private tarefas: Tarefa[];

  constructor() {
    this.localStorage = window.localStorage;

    this.tarefas = this.selecionarTodos();
  }

  public gravar(): void {
    const tarefasJsonString = JSON.stringify(this.tarefas);

    this.localStorage.setItem("tarefas", tarefasJsonString);
  }

  inserir(registro: Tarefa): void {
    this.tarefas.push(registro);
    this.gravar();
  }

  editar(id: string, registroEditado: Tarefa): void {
    const indexSelecionado = this.tarefas.findIndex(x => x.id === id);

    this.tarefas[indexSelecionado] = {
      id: id,
      descricao: registroEditado.descricao,
      dataCriacao: registroEditado.dataCriacao,
      prioridade: registroEditado.prioridade
    }

    this.gravar();
  }

  excluir(id: string): void {
    this.tarefas = this.tarefas.filter(x => x.id !== id);

    this.gravar();
  }

  selecionarTodos(): Tarefa[] {
    const dados = this.localStorage.getItem("tarefas");

    if (!dados)
      return [];

    return JSON.parse(dados);
  }
    
  selecionarPorId(id: string): Tarefa | undefined{
    return this.tarefas.find(x => x.id === id);
  }
}