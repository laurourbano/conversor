import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
<<<<<<< HEAD
import { Router } from '@angular/router';
=======
>>>>>>> 01cc4b80e9c69f3e34a9da2ad986e68d4f41990d
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
<<<<<<< HEAD

  dataSource!: MatTableDataSource<Conversao>;
=======
  dataSource: MatTableDataSource<Conversao>;
>>>>>>> 01cc4b80e9c69f3e34a9da2ad986e68d4f41990d

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

<<<<<<< HEAD
  constructor(private router: Router) {
  }

  ngOnInit() {

    //this.dataSource.data = JSON.parse(sessionStorage.getItem(colocar o array de objetos)) || [];
    //this.dataSource.sort = this.sort;
  }
=======
  constructor() {
    this.conversoes = [];
  };

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.conversoes)
    this.dataSource.sort = this.sort;
  };
>>>>>>> 01cc4b80e9c69f3e34a9da2ad986e68d4f41990d

  removeConversao(conversoes: Conversao[], conversao: Conversao): Conversao[] {
    return conversoes.filter(c => c !== conversao);
  }
  
};
