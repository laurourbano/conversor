import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: [ './menu.component.css' ]
})
export class MenuComponent {
  title = "Conversor de Moedas";
  titulos = [ 'Home', 'Histórico de Conversões' ]
  isMenuCollapsed = true;
  currentRoute: string = 'HOME';

  constructor(private router: Router) {
  }

  ngOnInit(): void {


  }
}
