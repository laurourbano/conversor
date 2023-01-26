import { MoedasService } from './../../services/moeda.service';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Moeda } from 'src/app/interfaces/moeda';
import { ConversorService } from 'src/app/services/conversor.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: [ './lista.component.css' ]
})
export class ListaComponent {

  lista = new MatTableDataSource<Moeda>([]);
  colunas: string[] = [ 'code', 'description' ];

  constructor(private MoedasService: MoedasService) { }

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

}
