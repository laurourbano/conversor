import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: [ './menu.component.css' ]
})
export class MenuComponent {
[x: string]: any;
  title = "Conversor de Moedas";
  titulos = [ 'Home', 'Histórico de Conversões' ]
  active = "HOME";
  isMenuCollapsed = true;
  activeId: any;
}
