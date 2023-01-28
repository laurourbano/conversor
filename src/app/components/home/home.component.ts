import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import { Moeda } from 'src/app/interfaces/moeda';
import { MoedaService } from 'src/app/services/moeda.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
  moedas: Moeda[] = [];
  form: FormGroup;
  moedaSelecionada!: string;
  moedaConvertida!: string;
  valor: number = 0;
  resultado: any = 'lauro';

  constructor(private moedaService: MoedaService) {
    this.form = new FormGroup({
      moedaSelecionada: new FormControl(''),
      moedaConvertida: new FormControl(''),
      valor: new FormControl('')
    });
    return
  }
  ngOnInit(): void {
    this.moedaService.gerarCotacao().subscribe((res) => {
      let resultado = Object.keys(res.symbols).map(function (moeda) {
        let retorno = res.symbols[ moeda ]
        return retorno
      });
      this.moedas = resultado
      /*console.log(resultado)
      console.log(res.symbols)*/
    })

  }

  converter() {
    this.moedaService.converter(this.moedaSelecionada, this.moedaConvertida, this.valor).subscribe((res: any) => {
      this.resultado = res[ "retorno" ];
      console.log(`${ res[ "retorno" ] }
retorno`)
    });
    console.log('clicou')
    console.log(`${ this.moedaSelecionada }
selecionada`)
    console.log(`${ this.moedaConvertida }
convertida`)
    console.log(`${ this.valor }
valor`)
  }
}

