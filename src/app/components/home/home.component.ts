import {
  Component,
  OnInit
} from '@angular/core';
import { Moeda } from './../../interfaces/moeda';

import {
  Conversao
} from 'src/app/interfaces/conversao';
import {
  MoedaService
} from 'src/app/services/moeda.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})

export class HomeComponent implements OnInit {
  isInputBlurredMS = false;
  isInputBlurredMC = false;
  isInputBlurredV = false;


  moedas: Moeda[] = [];

  resultadoEmDolar!: number;
  data!: Date;
  hora!: Date;
  moedaSelecionada!: string;
  moedaConvertida!: string;
  valor!: number;
  taxa!: number;
  resultado!: number;

  conversoes: Conversao[] = [];
  conversao!: Conversao;
  formControl: any;

  constructor(private moedaService: MoedaService) {

  };

  ngOnInit(): void {
    this.moedaService.gerarCotacao().subscribe((res: any) => {
      this.moedas = Object.keys(res.symbols).map(function (moeda) {
        return res.symbols[ moeda ];
      });
    });

  };

  realizaConversao() {
    if (!this.moedaSelecionada || !this.moedaConvertida || this.valor <= 0) {
      return
    }
    this.moedaService.converter(this.moedaSelecionada, this.moedaConvertida, this.valor).subscribe((res: any) => {
      this.taxa = res.info.rate;
      this.resultado = res.result;
      this.checkResultadoEmDolar(this.resultado);
      this.mostraMensagemDeSucesso();
    })
  }

  mostraMensagemDeSucesso() {
    let sucesso = document.querySelector('.sucesso');
    sucesso!.innerHTML = "<div class='alert alert-success shadow border border-info' role='alert'><strong>Conversão realizada com sucesso!</strong></div>";
    document.querySelector('.sucesso');
    setTimeout(() => {
      sucesso!.innerHTML = "";
    }, 3 * 1000);
  }


  checkResultadoEmDolar(resultado: number) {
    this.moedaService.converter(this.moedaConvertida, 'USD', resultado).subscribe((resultadoEmDolar: any) => {
      this.resultadoEmDolar = resultadoEmDolar.result;
      let conversao = {
        data: new Date(),
        hora: new Date(),
        moedaSelecionada: this.moedaSelecionada,
        moedaConvertida: this.moedaConvertida,
        valor: this.valor,
        taxa: this.taxa,
        resultado: resultado,
        resultadoEmDolar: this.resultadoEmDolar,
      };
      this.conversoes.push(conversao);
      sessionStorage.setItem('conversoes', JSON.stringify(this.conversoes));
    });
  }
}
