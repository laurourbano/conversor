import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Conversao } from 'src/app/interfaces/conversao';
import { ConversorService } from 'src/app/services/conversor.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: [ './historico.component.css' ]
})
export class HistoricoComponent {
  public conversoes?: Conversao[];

  lista = new MatTableDataSource<any>([]);
  colunas: string[] = [
    'Data da Conversão',
    'Hora da Conversão',
    'Valor Informado',
    'Moeda Selecionada',
    'Moeda Convertida',
    'Resultado',
    'Taxa',
    'Ações'
  ];

  title = "Conversor de Moedas";
  historico = 'Histórico de Conversões';
  home = 'Home';

  constructor(private conversaoService: ConversorService) { }

  ngOnInit(): void {
    this.conversaoService.cotacaoAtual().subscribe((resultado) => {
      this.lista.data = Object.values(resultado.symbols);
      console.log(resultado.symbols)
    })
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit(): void {
    this.lista.paginator = this.paginator;
    this.lista.sort = this.sort;
  }

}
