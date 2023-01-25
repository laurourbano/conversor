import { Router } from '@angular/router';
import { ConversorService } from './../../services/conversor.service';
import { Component } from '@angular/core';
import { Conversao } from 'src/app/interfaces/conversao';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: [ './menu.component.css' ]
})
export class MenuComponent {
  public conversoes?: Conversao[];
  title = "Conversor de Moedas";
  historico = 'Histórico de Conversões';
  home = 'Home';

}
