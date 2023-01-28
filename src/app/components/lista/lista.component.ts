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

  lista = new MatTableDataSource<Moeda>([]);
  colunas: string[] = [ 'code', 'description' ];

  constructor(private MoedaService: MoedaService) {
  }

  ngOnInit(): void {
    this.MoedaService.gerarCotacao().subscribe((res) => {
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lista.filter = filterValue.trim().toLowerCase();
    if (this.lista.paginator) {
      this.lista.paginator.firstPage();
    }
  }
}

