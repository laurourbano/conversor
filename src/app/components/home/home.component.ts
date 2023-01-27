import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Moeda } from 'src/app/interfaces/moeda';
import { MoedasService } from './../../services/moeda.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
  lista = new MatTableDataSource<any>([]);

  constructor(private MoedasService: MoedasService) { }

  ngOnInit(): void {
    this.MoedasService.gerarCotacao().subscribe((res) => {
      this.lista.data = Object.values(res.symbols);
      console.log(res.symbols)
    });
    this.MoedasService.gerarCotacao().forEach((e) => {
      console.log(this.lista.data.values())
    })

  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit(): void {
    this.lista.paginator = this.paginator;
    this.lista.sort = this.sort;
  }

  moedas: Moeda[] = []

  moedaConvertida = Object.values(this.lista.data);
  moedaSelecionada = Object.values(this.lista.data);


}
