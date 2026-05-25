import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';

import { MoedasDisponiveis } from '../../interfaces/api';
import { obterPais } from '../../interfaces/paises';
import { MoedaService } from '../../services/moeda.service';

interface MoedaLinha {
  code: string;
  pais: string;
  description: string;
}

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})
export class ListaComponent {
  colunas: string[] = ['code', 'pais', 'description'];
  dataSource = new MatTableDataSource<MoedaLinha>([]);

  carregando = true;
  erro = false;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private moedaService: MoedaService,
    private liveAnnouncer: LiveAnnouncer,
  ) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.buscarMoedas();
  }

  buscarMoedas(): void {
    this.carregando = true;
    this.erro = false;

    forkJoin([
      this.moedaService.gerarCotacao(),
      this.moedaService.carregarPares(),
    ]).subscribe({
      next: ([moedasRes, paresRes]) => {
        this.carregando = false;

        if (!moedasRes || Object.keys(moedasRes).length === 0) {
          this.erro = true;
          return;
        }

        this.moedaService.cachePares(paresRes);
        this.dataSource.data = Object.keys(moedasRes)
          .map((code) => ({
            code,
            pais: obterPais(code, moedasRes[code]),
            description: moedasRes[code],
          }))
          .sort((a, b) => a.pais.localeCompare(b.pais, 'pt-BR'));
      },
      error: () => {
        this.carregando = false;
        this.erro = true;
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
