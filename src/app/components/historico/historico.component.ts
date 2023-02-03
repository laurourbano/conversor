import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: [ './historico.component.css' ]
})

export class AppComponent implements OnInit {

  displayedColumns: string[] = ['data', 'hora', 'moedaSelecionada', 'moedaConvertida', 'valor', 'taxa', 'resultado', 'excluir'];
  conversoes: any[] = [];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    
    const storedConversoes = sessionStorage.getItem('conversoes');
    if (storedConversoes) {
      this.conversoes = JSON.parse(storedConversoes);
    }
    this.dataSource = new MatTableDataSource(this.conversoes);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /*deleteItem(item) {
    this.list = this.list.filter(i => i !== item);
  }*/
  

}
