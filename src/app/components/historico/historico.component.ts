import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Conversao } from 'src/app/interfaces/conversao';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: [ './historico.component.css' ]
})

export class HistoricoComponent implements OnInit {

  displayedColumns: string[] = [ 'i', 'data', 'hora', 'moedaSelecionada', 'moedaConvertida', 'valor', 'taxa', 'resultado', 'excluir' ];
  conversoes: Conversao[] = [];
  conversao: Conversao = {
    i: false,
    data: '',
    moedaSelecionada: '',
    moedaConvertida: '',
    valor: 0,
    taxa: 0,
    resultado: 0
  };

  dataSource = new MatTableDataSource<Conversao>();

  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  constructor(private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit() {
    const storedConversoes = sessionStorage.getItem('conversoes');
    if (storedConversoes) {
      this.conversoes = JSON.parse(storedConversoes);
    }
    this.dataSource.data = this.conversoes;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  deleteItem(conversao: Conversao) {
    const index = this.dataSource.data.indexOf(conversao);
    this.dataSource.data.splice(index, 1);
    this.dataSource.data = [ ...this.dataSource.data ];
    sessionStorage.setItem('conversoes', JSON.stringify(this.dataSource.data));
  }

  ngAfterViewInit() {
    this.dataSource!.sort = this.sort;
    console.log(this.conversoes)
  }

  announceSortChange(sortState: Sort): void {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${ sortState.direction }ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }

  }
}
