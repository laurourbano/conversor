import {
  LiveAnnouncer
} from '@angular/cdk/a11y';
import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  MatDialog, MatDialogRef
} from '@angular/material/dialog';
import {
  MatPaginator
} from '@angular/material/paginator';
import {
  MatSort,
  Sort
} from '@angular/material/sort';
import {
  MatTableDataSource
} from '@angular/material/table';

import {
  Conversao
} from 'src/app/interfaces/conversao';
import {
  DeleteConfirmationDialogComponent
} from '../delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: [ './historico.component.css' ]
})

export class HistoricoComponent implements OnInit {

  displayedColumns: string[] = [ 'data', 'hora', 'moedaSelecionada', 'moedaConvertida', 'valor', 'taxa', 'resultado', 'excluir' ];
  conversoes: Conversao[] = [];
  conversao: Conversao = {
    data: new Date(),
    hora: new Date(),
    moedaSelecionada: '',
    moedaConvertida: '',
    valor: 0,
    taxa: 0,
    resultado: 0,
    resultadoEmDolar: 0,
  };
  dataSource = new MatTableDataSource<Conversao>();

  @ViewChild(MatSort, {
    static: true
  })
  sort!: MatSort;
  @ViewChild(MatPaginator, {
    static: true
  })
  paginator!: MatPaginator;

  constructor(public _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog) { }

  ngOnInit() {
    this.carregaConversoes();
    this.configuraTabela()

  }

  carregaConversoes() {
    const storedConversoes = sessionStorage.getItem('conversoes');
    if (storedConversoes) {
      this.conversoes = JSON.parse(storedConversoes);
    }
  }

  configuraTabela() {
    this.dataSource.data = this.conversoes;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  abrirDeleteDialogDeConfirmacao(conversao: Conversao) {
    const dialogRef: MatDialogRef<DeleteConfirmationDialogComponent, boolean>  = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: {
        conversao
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteItem(conversao)
      }
    });
  }

  deleteItem(conversao: Conversao) {
    const index = this.dataSource.data.indexOf(conversao);
    this.dataSource.data.splice(index, 1);
    this.dataSource.data = [ ...this.dataSource.data ];
    sessionStorage.setItem('conversoes', JSON.stringify(this.dataSource.data));

  }

  ngAfterViewInit() {
    this.dataSource!.sort = this.sort;
  }

  anunciarMudancaDeOrdenacao(sortState: Sort): void {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${ sortState.direction }ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }

  }
}
