import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConversorService } from './../../services/conversor.service';
import { Conversao } from 'src/app/interfaces/conversao';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: [ './historico.component.css' ]
})
export class HistoricoComponent {
  public conversoes?: Conversao[];
  title = "Conversor de Moedas";
  historico = 'Histórico de Conversões';
  home = 'Home';

  constructor(private ConversorService: ConversorService, private router: Router){}
  ngOnInit(){
    this.getListaConversoes();
  }
  getListaConversoes(){
    this.ConversorService.getListaConversoes().subscribe((Conversoes:Conversao[])=>{
      this.conversoes = Conversoes;
    });
  }
}
