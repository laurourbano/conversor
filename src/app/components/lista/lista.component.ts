import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Moeda } from 'src/app/interfaces/moeda';
import { MoedasService } from './../../services/moeda.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: [ './lista.component.css' ]
})
export class ListaComponent {

  lista = new MatTableDataSource<Moeda>([]);
  colunas: string[] = [ 'code', 'description' ];

  constructor(private MoedasService: MoedasService, private _liveAnnouncer: LiveAnnouncer) {
  }

  ngOnInit(): void {
    this.MoedasService.gerarCotacao().subscribe((res) => {
      this.lista.data = Object.values(res.symbols);
      console.log(res.symbols)
    })
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit(): void {
    this.lista.paginator = this.paginator;
    this.lista.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}

