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
export class HistoricoComponent {

  displayedColumns: string[] = [ 'data', 'hora', 'moedaSelecionada', 'moedaConvertida', 'valor', 'taxa', 'resultado', 'acoes' ];
  dataSource!: MatTableDataSource<Conversao>;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private sessionStorage: SessionStorageService) {
  }

  ngOnInit() {

    //this.dataSource.data = JSON.parse(sessionStorage.getItem(colocar o array de objetos)) || [];
    this.dataSource.sort = this.sort;
  }

  deleteItem(conversao: Conversao): void {
  }

}
