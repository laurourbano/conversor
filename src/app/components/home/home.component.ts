import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ConversorService } from './../../services/conversor.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {

  lista = new MatTableDataSource<any>([]);
  colunas: string[] = [ 'sigla', 'descricao' ];

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

};


