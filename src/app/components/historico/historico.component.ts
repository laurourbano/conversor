import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SessionStorageService } from 'ngx-webstorage';
import { Conversao } from 'src/app/interfaces/conversao';
@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: [ './historico.component.css' ]
})
<<<<<<< Updated upstream
export class HistoricoComponent {
  public conversoes?: Conversao[];

  dataSource = new MatTableDataSource<any>([]);
  colunas: string[] = [
    'data',
    'hora',
    'moedaSelecionada',
    'moedaConvertida',
    'valor',
    'resultado',
    'taxa',
    'excluir'
  ];
=======
export class HistoricoComponent implements Conversao {
  displayedColumns: string[] = [ 'data', 'hora', 'moedaSelecionada', 'moedaConvertida', 'valor', 'taxa', 'resultado' ];
  dataSource!: MatTableDataSource<Conversao>;
>>>>>>> Stashed changes

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

<<<<<<< Updated upstream
  constructor(private conversaoService: ConversorService) { }

  ngOnInit(): void {

    //recebe as conversoes de HomeComponent

  }
=======
  constructor(private sessionStorage: SessionStorageService) { }
  moedaSelecionada!: string;
  moedaConvertida!: string;
  valor!: number;
  resultado!: number;
  taxa!: number;
  data!: string;
  hora!: string;
  acao: any;
>>>>>>> Stashed changes

  ngOnInit() {
    const historicoData = this.sessionStorage.retrieve('historicoData');
    this.dataSource = new MatTableDataSource(historicoData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.data = new Date().toDateString();
    this.hora = new Date().toLocaleDateString();
    this.moedaSelecionada =
      this.moedaConvertida = // your code here
      this.valor = // your code here
      this.taxa = // your code here
      this.resultado = // your code here

  }

  deleteItem(conversao:Conversao){

    //retirar o item do array de objetos armazenado como json 

  }

}
