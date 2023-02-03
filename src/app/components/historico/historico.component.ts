import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Conversao } from './../../interfaces/conversao';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: [ './historico.component.css' ]
})

export class HistoricoComponent implements Conversao {


  displayedColumns: string[] = [ 'data', 'hora', 'moedaSelecionada', 'moedaConvertida', 'valor', 'taxa', 'resultado', 'acoes' ];

  dataSource!: MatTableDataSource<Conversao>;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  conversao!: Conversao;
  conversoes: Conversao[];

  data!: string;
  hora!: string;
  moedaSelecionada!: string;
  moedaConvertida!: string;
  valor!: number;
  taxa!: number;
  resultado!: number;

  constructor() {
    this.conversoes = [];
  };

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.conversoes)
    this.dataSource.sort = this.sort;
  };


};
