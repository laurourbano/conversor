import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Conversao } from 'src/app/interfaces/conversao';
import { Moeda } from 'src/app/interfaces/moeda';
import { MoedaService } from 'src/app/services/moeda.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})

<<<<<<< HEAD


=======
export class HomeComponent implements OnInit, Conversao {
>>>>>>> 01cc4b80e9c69f3e34a9da2ad986e68d4f41990d
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
<<<<<<< HEAD
  sessionStorage: any;
=======
>>>>>>> 01cc4b80e9c69f3e34a9da2ad986e68d4f41990d

  dadosDoArray: any = this.conversoes;

  constructor(private moedaService: MoedaService, private router: Router) {
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
<<<<<<< HEAD
      this.moedas = resultado
    })
    this.router.navigate(['/destination'], { state: { dados: this.dadosDoArray } });
    console.log(this.dadosDoArray)

  }
=======
      this.moedas = resultado;
    });
  };
>>>>>>> 01cc4b80e9c69f3e34a9da2ad986e68d4f41990d

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
        const conversao = this.conversoes.push({
          data: this.data,
          hora: this.hora,
          moedaSelecionada: this.moedaSelecionada,
          moedaConvertida: this.moedaConvertida,
          valor: this.valor,
          taxa: this.taxa,
          resultado: this.resultado,
        });
        const conversoesString = sessionStorage.getItem('conversoes');
        let conversoes = [];
        if(conversoesString){
          conversoes = JSON.parse(conversoesString);
        };
        conversoes.push(conversao);
        sessionStorage.setItem('conversoes', JSON.stringify(conversoes));
      });
<<<<<<< HEAD
=======
      console.log(this.conversoes);
>>>>>>> 01cc4b80e9c69f3e34a9da2ad986e68d4f41990d
    } else {
      return console.error('Preencha os campos');
    };
  };
};



