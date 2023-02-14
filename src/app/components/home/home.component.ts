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

  i!: boolean;
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
      let resultado = Object.keys(res.symbols).map(function (moeda) {
        let result = res.symbols[ moeda ];
        return result
      });
      this.moedas = resultado;
    });

  };

  converter() {
    if (this.moedaSelecionada && this.moedaConvertida && this.valor > 0) {
      this.moedaService.converter(this.moedaSelecionada, this.moedaConvertida, this.valor).subscribe((res: any) => {
        this.data = new Date();
        this.hora = new Date();
        this.moedaSelecionada;
        this.moedaConvertida;
        this.valor;
        this.taxa = res[ 'info' ][ 'rate' ];
        this.resultado = res[ 'result' ];
        this.checkResultadoDollar(this.resultado);
        let sucesso = document.querySelector('.sucesso');
        sucesso!.innerHTML = "<div class='alert alert-success shadow border border-info' role='alert'><strong>Conversão realizada com sucesso!</strong></div>";
        document.querySelector('.sucesso');
        setTimeout(() => {
          sucesso!.innerHTML = "";
        }, 3 * 1000);

      })
    }
  }

  checkResultadoDollar(resultado: number) {
    this.moedaService.converter(this.moedaConvertida, 'USD', resultado).subscribe((resDollar: any) => {
      this.i = resDollar[ 'result' ] > 10000
      let conversao = {
        i: this.i,
        data: this.data,
        hora: this.hora,
        moedaSelecionada: this.moedaSelecionada,
        moedaConvertida: this.moedaConvertida,
        valor: this.valor,
        taxa: this.taxa,
        resultado: resultado,
      };
      this.conversoes.push(conversao);
      sessionStorage.setItem('conversoes', JSON.stringify(this.conversoes));
    });
  }


}
