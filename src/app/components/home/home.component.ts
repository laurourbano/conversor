import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Conversao } from 'src/app/interfaces/conversao';
import { Moeda } from 'src/app/interfaces/moeda';
import { MoedaService } from 'src/app/services/moeda.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})

export class HomeComponent implements OnInit, Conversao {
  moedas: Moeda[] = [];
  form: FormGroup;
  data: string = '';
  hora: string = '';
  moedaSelecionada!: string;
  moedaConvertida!: string;
  valor: number = 0;
  taxa: number = 0;
  resultado: number = 0;
  conversoes: Conversao[] = [];

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
      console.log(this.moedas)
    });
  };

  converter() {
    event?.preventDefault()
    if (this.moedaConvertida && this.moedaSelecionada && this.valor) {
      this.moedaService.converter(this.moedaSelecionada, this.moedaConvertida, this.valor).subscribe((res: any) => {
        this.data = new Date().toLocaleDateString();
        this.hora = new Date().toLocaleTimeString();
        this.moedaSelecionada;
        this.moedaConvertida;
        this.valor;
        this.taxa = res[ 'info' ][ 'rate' ];
        this.resultado = res[ 'result' ];

      });
      console.log(this.conversoes);
    } else {
      return console.error('Preencha os campos');
    };
  };
};



