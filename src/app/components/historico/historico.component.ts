import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Conversao } from 'src/app/interfaces/conversao';
import { ConversorService } from 'src/app/services/conversor.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: [ './historico.component.css' ]
})
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

  title = "Conversor de Moedas";
  historico = 'Histórico de Conversões';
  home = 'Home';

  constructor(private conversaoService: ConversorService) { }

  ngOnInit(): void {

    //recebe as conversoes de HomeComponent

  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteItem(conversao:Conversao){

    //retirar o item do array de objetos armazenado como json 

  }

}
