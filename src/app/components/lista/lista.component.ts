import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { MoedasDisponiveis } from '../../interfaces/api';
import { MoedaService } from '../../services/moeda.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})
export class ListaComponent {
  colunas: string[] = ['code', 'description'];
  dataSource = new MatTableDataSource<{ code: string; description: string }>(
    [],
  );

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private moedaService: MoedaService,
    private liveAnnouncer: LiveAnnouncer,
  ) {}

  ngOnInit(): void {
    this.buscarMoedas();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  buscarMoedas(): void {
    this.moedaService.gerarCotacao().subscribe({
      next: (res: MoedasDisponiveis) => {
        this.dataSource.data = Object.keys(res).map((code) => ({
          code,
          description: res[code],
        }));
      },
      error: () => {
        this.dataSource.data = [];
      },
    });
  }

  aplicarFiltro(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  anunciarMudancaDeOrdenacao(sortState: Sort): void {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }
}
