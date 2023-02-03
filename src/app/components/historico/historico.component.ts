import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: [ './historico.component.css' ]
})

<<<<<<< Updated upstream
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
=======
export class HistoricoComponent {

  displayedColumns: string[] = [ 'data', 'hora', 'moedaSelecionada', 'moedaConvertida', 'valor', 'taxa', 'resultado', 'acoes' ];

  conversao: Conversao = {
    data: '',
    hora: '',
    moedaSelecionada: '',
    moedaConvertida: '',
    valor: 0,
    taxa: 0,
    resultado: 0
  }
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Conversao>;
  conversoes!: any[];


  constructor() { };

  ngOnInit(): void {
    let conversoes = sessionStorage.getItem('conversoes');
    if (conversoes) {
      this.conversoes = JSON.parse(conversoes)
      this.dataSource = new MatTableDataSource(this.conversoes)
      console.log(conversoes)

    }
  }

  excluir(conversao: Conversao): void {
    const index = this.dataSource.data.indexOf(conversao);
    this.dataSource.data.splice(index, 1);
    sessionStorage.setItem('conversoes', JSON.stringify(this.dataSource.data));
    this.dataSource._updateChangeSubscription();
>>>>>>> Stashed changes
  }

  /*deleteItem(item) {
    this.list = this.list.filter(i => i !== item);
  }*/
  

}
