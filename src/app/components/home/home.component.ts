import { MoedasService } from './../../services/moeda.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Moeda } from 'src/app/interfaces/moeda';
import { ConversorService } from './../../services/conversor.service';

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
    })
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit(): void {
    this.lista.paginator = this.paginator;
    this.lista.sort = this.sort;
  }

  cars: Car[] = [
    { value: 'ford', viewValue: 'Ford' },
    { value: 'chevrolet', viewValue: 'Chevrolet' },
    { value: 'dodge', viewValue: 'Dodge' },
  ];
  
  selectedCar = this.cars[ 0 ].value;

  selectCar(event: Event) {
    this.selectedCar = (event.target as HTMLSelectElement).value;
  }

}

interface Food {
  value: string;
  viewValue: string;
}

interface Car {
  value: string;
  viewValue: string;
}
