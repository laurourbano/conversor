import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Conversao } from '../../interfaces/conversao';
import { HistoricoService } from '../../services/historico.service';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css'],
})
export class HistoricoComponent {
  displayedColumns: string[] = [
    'data',
    'hora',
    'moedaSelecionada',
    'moedaConvertida',
    'valor',
    'taxa',
    'resultado',
    'excluir',
  ];
  dataSource = new MatTableDataSource<Conversao>([]);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private historicoService: HistoricoService,
    private liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.carregarConversoes();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  carregarConversoes(): void {
    this.dataSource.data = this.historicoService.getAll();
  }

  abrirDialogConfirmacao(conversao: Conversao): void {
    const dialogRef: MatDialogRef<DeleteConfirmationDialogComponent, boolean> =
      this.dialog.open(DeleteConfirmationDialogComponent, {
        data: { conversao },
      });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.historicoService.delete(conversao);
        this.dataSource.data = this.historicoService.getAll();
      }
    });
  }

  anunciarMudancaDeOrdenacao(sortState: Sort): void {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }
}
