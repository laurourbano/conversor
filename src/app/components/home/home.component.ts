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
  resultado: number = 0;
  taxa: number = 0;

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
        let result = res.symbols[ moeda ]
        return result
      });
      this.moedas = resultado
    })

  }

  converter() {
    this.moedaService.converter(this.moedaSelecionada, this.moedaConvertida, this.valor).subscribe((res: any) => {
      this.resultado = res[ 'result' ];
      this.taxa = res[ 'info' ][ 'rate' ];
    });

  }
}

