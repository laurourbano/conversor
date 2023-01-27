import { Component, ViewChild } from '@angular/core';
import { Conversao } from 'src/app/interfaces/conversao';
import { NgbdNavBasic } from '../menu/nav-basic'
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: [ './menu.component.css' ]
})
export class MenuComponent {
  public conversoes?: Conversao[];
  title = "Conversor de Moedas";
  titulos = [ 'Home', 'Histórico de Conversões' ]
active: any;

}
