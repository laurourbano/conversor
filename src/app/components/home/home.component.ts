import { Component, OnInit } from '@angular/core';
import { Moeda } from './../../interfaces/moeda';

import { Conversao } from 'src/app/interfaces/conversao';
import { MoedaService } from 'src/app/services/moeda.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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

  constructor(private moedaService: MoedaService) {}

  ngOnInit(): void {
    this.moedaService.gerarCotacao().subscribe({
      next: (res: any) => {
        console.log('RES:', res);

        if (!res) {
          console.error('API nao retornou dados:', res);
          this.moedas = [];
          return;
        }

        this.moedas = Object.keys(res).map((code) => ({
          code: code,
          description: res[code],
        }));
      },
      error: (err) => {
        console.error('Erro HTTP:', err);
        this.moedas = [];
      },
    });
  }

  realizaConversao() {
    if (
      !this.moedaSelecionada ||
      !this.moedaConvertida ||
      !this.valor ||
      this.valor <= 0
    ) {
      return;
    }
    this.moedaService
      .converter(this.moedaSelecionada, this.moedaConvertida, this.valor)
      .subscribe({
        next: (res: any) => {
          const key = this.moedaSelecionada + this.moedaConvertida;
          const data = res[key];
          if (data) {
            this.taxa = parseFloat(data.bid);
            this.resultado = this.valor * this.taxa;
            this.checkResultadoEmDolar(this.resultado);
            this.mostraMensagemDeSucesso();
          } else {
            console.error('Par de moedas nao encontrado na resposta:', res);
            this.resultado = 0;
            this.taxa = 0;
            this.mostraMensagemDeErro();
          }
        },
        error: (err) => {
          console.error('Erro ao converter:', err);
          this.resultado = 0;
          this.taxa = 0;
          this.mostraMensagemDeErro();
        },
      });
  }

  mostraMensagemDeSucesso() {
    let sucesso = document.querySelector('.sucesso');
    sucesso!.innerHTML =
      "<div class='alert alert-success shadow border border-info' role='alert'><strong>Conversao realizada com sucesso!</strong></div>";
    document.querySelector('.sucesso');
    setTimeout(() => {
      sucesso!.innerHTML = '';
    }, 3 * 1000);
  }

  mostraMensagemDeErro() {
    let sucesso = document.querySelector('.sucesso');
    sucesso!.innerHTML =
      "<div class='alert alert-danger shadow border border-danger' role='alert'><strong>Erro: Cotação não disponível para o par selecionado.</strong></div>";
    setTimeout(() => {
      sucesso!.innerHTML = '';
    }, 5 * 1000);
  }

  checkResultadoEmDolar(resultado: number) {
    if (this.moedaConvertida === 'USD') {
      this.resultadoEmDolar = resultado;
      this.salvarConversao(resultado);
      return;
    }

    this.moedaService
      .converter(this.moedaConvertida, 'USD', resultado)
      .subscribe({
        next: (resultadoEmDolar: any) => {
          const key = this.moedaConvertida + 'USD';
          const data = resultadoEmDolar[key];
          if (data) {
            this.resultadoEmDolar = resultado * parseFloat(data.bid);
          } else {
            this.resultadoEmDolar = 0;
          }
          this.salvarConversao(resultado);
        },
        error: (err) => {
          console.error('Erro ao converter para USD:', err);
          this.resultadoEmDolar = 0;
          this.salvarConversao(resultado);
        },
      });
  }

  private salvarConversao(resultado: number) {
    let conversao = {
      data: new Date(),
      hora: new Date(),
      moedaSelecionada: this.moedaSelecionada,
      moedaConvertida: this.moedaConvertida,
      valor: Number(this.valor),
      taxa: this.taxa,
      resultado: resultado,
      resultadoEmDolar: this.resultadoEmDolar,
    };

    const stored = sessionStorage.getItem('conversoes');
    if (stored) {
      this.conversoes = JSON.parse(stored);
    }
    this.conversoes.push(conversao);
    sessionStorage.setItem('conversoes', JSON.stringify(this.conversoes));
  }
}
