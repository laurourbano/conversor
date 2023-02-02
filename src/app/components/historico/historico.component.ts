import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Conversao } from 'src/app/interfaces/conversao';
import { SessionStorage } from 'ngx-store';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: [ './historico.component.css' ]
})

export class HistoricoComponent {

  @SessionStorage() conversoes: Conversao[];

  displayedColumns: string[] = [ 'data', 'hora', 'moedaSelecionada', 'moedaConvertida', 'valor', 'taxa', 'resultado', 'acoes' ];
  dataSource!: MatTableDataSource<Conversao>;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor() {
    this.conversoes = [];
  };

  ngOnInit() {
    this.dataSource.sort = this.sort;
  };

  removeConversao(conversoes: Conversao[], conversao: Conversao): Conversao[] {
    return conversoes.filter(c => c !== conversao);
  }
  
};
