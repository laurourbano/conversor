import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Moeda } from 'src/app/interfaces/moeda';
import { MoedaService } from './../../services/moeda.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: [ './lista.component.css' ]
})

export class ListaComponent implements Moeda {

  colunas: string[] = [ 'code', 'description' ];
  dataSource = new MatTableDataSource<any>([]);
  description: string = '';
  code: string = '';

  id!: string;
  start!: SortDirection;
  disableClear!: boolean;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private MoedaService: MoedaService, private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
    this.buscaDadosDeMoedas();
    this.configuraPaginadorEClassificador()
  };

  buscaDadosDeMoedas() {
    this.MoedaService.gerarCotacao().subscribe((res) => {
      this.dataSource.data = Object.values(res.symbols);
    });
  }

  configuraPaginadorEClassificador() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ordenaDados(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    };

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'code': return this.compare(a.code, b.code, isAsc);
        case 'description': return this.compare(a.description, b.description, isAsc);
        default: return 0;
      };
    });
  };

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  };

  aplicaFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    };
  };

  anunciarMudancaDeOrdenacao(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${ sortState.direction }ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    };
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes[ 'sort' ] && !changes[ 'sort' ].firstChange) {
      this.ordenaDados(changes[ 'sort' ].currentValue);
    };
  };

  compare(a: string | number, b: string | number, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  };

};
