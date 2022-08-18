import { IPaginaHTML } from "./shared/pagina.interface";

class Index implements IPaginaHTML{
  constructor(){
    this.configurarElementos();
  }
  
  public configurarElementos(): void {
  }
}
new Index();