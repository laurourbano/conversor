import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Moeda } from 'src/app/interfaces/moeda';
import { MoedaService } from './../../services/moeda.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: [ './lista.component.css' ]
})
export class ListaComponent {

  colunas: string[] = [ 'code', 'description' ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<Moeda>([]);

  constructor(private MoedaService: MoedaService, private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
    this.MoedaService.gerarCotacao().subscribe((res) => {
      this.dataSource.data = Object.values(res.symbols);
      console.log(this.dataSource)
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${ sortState.direction }ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}

