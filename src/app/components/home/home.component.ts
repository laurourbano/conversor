import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import { Conversao } from 'src/app/interfaces/conversao';
import { Moeda } from 'src/app/interfaces/moeda';
import { MoedaService } from 'src/app/services/moeda.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})

export class HomeComponent implements OnInit {

  form: FormGroup;

  moedas: Moeda[] = [];

  i!: boolean;
  data!: string;
  moedaSelecionada!: string;
  moedaConvertida!: string;
  valor!: number;
  taxa!: number;
  resultado!: number;

  conversoes: Conversao[] = [];
  conversao!: Conversao;
  formControl: any;

  constructor(private moedaService: MoedaService) {
    this.form = new FormGroup({
      moedaSelecionada: new FormControl(''),
      moedaConvertida: new FormControl(''),
      valor: new FormControl(''),
    });

    return;
  };

  ngOnInit(): void {
    this.moedaService.gerarCotacao().subscribe((res: any) => {
      let resultado = Object.keys(res.symbols).map(function (moeda) {
        let result = res.symbols[ moeda ];
        return result;
      });
      this.moedas = resultado;
    });
  };

  converter() {
    if (this.moedaConvertida && this.moedaSelecionada && this.valor) {
      this.moedaService.converter(this.moedaSelecionada, this.moedaConvertida, this.valor).subscribe((res: any) => {
        this.data = String(new Date().toLocaleDateString('pt-BR'));
        this.moedaSelecionada;
        this.moedaConvertida;
        this.valor;
        this.taxa = res[ 'info' ][ 'rate' ];
        this.resultado = res[ 'result' ];
        this.checkResultadoDollar(this.resultado);
      });
    }
  }

  checkResultadoDollar(resultado: number) {
    this.moedaService.converter(this.moedaConvertida, 'USD', resultado).subscribe((resDollar: any) => {
      this.i = resDollar['result'] >= 10_000
      let conversao = {
        i: this.i,
        data: this.data,
        moedaSelecionada: this.moedaSelecionada,
        moedaConvertida: this.moedaConvertida,
        valor: this.valor,
        taxa: this.taxa,
        resultado: resultado,
      };
      console.log(resDollar[ 'result' ])
      this.conversoes.push(conversao);
      sessionStorage.setItem('conversoes', JSON.stringify(this.conversoes));
    });
  }


}
