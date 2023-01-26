import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Conversao } from 'src/app/interfaces/conversao';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: [ './historico.component.css' ]
})
export class HistoricoComponent {
  public conversoes?: Conversao[];
  displayedColumns: string[] = [ 'position', 'name', 'weight', 'symbol', 'delete' ];
  dataSource = ELEMENT_DATA;

  title = "Conversor de Moedas";
  historico = 'Histórico de Conversões';
  home = 'Home';

  constructor(private router?: Router) { }

}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  delete: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', delete: 'x' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', delete: 'x' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', delete: 'x' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', delete: 'x' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B', delete: 'x' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', delete: 'x' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', delete: 'x' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', delete: 'x' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', delete: 'x' },
];
