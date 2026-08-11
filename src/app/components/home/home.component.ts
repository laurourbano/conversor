import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Moeda } from '../../interfaces/moeda';
import { Conversao } from '../../interfaces/conversao';
import { MoedasDisponiveis, CotacaoResponse } from '../../interfaces/api';
import { obterPais } from '../../interfaces/paises';
import { MoedaService } from '../../services/moeda.service';
import { HistoricoService } from '../../services/historico.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  moedas: Moeda[] = [];
  carregandoMoedas = true;
  erroMoedas = false;

  moedaSelecionada!: string;
  moedaConvertida!: string;
  valor!: number;
  taxa!: number;
  resultado!: number;
  resultadoEmDolar!: number;

  convertendo = false;
  mensagem: { tipo: 'sucesso' | 'erro'; texto: string } | null = null;

  constructor(
    private moedaService: MoedaService,
    private historicoService: HistoricoService,
  ) {}

  ngOnInit(): void {
    this.carregarMoedas();
  }

  private carregarMoedas(): void {
    this.carregandoMoedas = true;
    this.erroMoedas = false;

    forkJoin([
      this.moedaService.gerarCotacao(),
      this.moedaService.carregarPares(),
    ]).subscribe({
      next: ([moedasRes, paresRes]) => {
        this.carregandoMoedas = false;

        if (!moedasRes || Object.keys(moedasRes).length === 0) {
          this.moedas = [];
          this.erroMoedas = true;
          return;
        }

        this.moedaService.cachePares(paresRes);
        this.moedas = Object.keys(moedasRes)
          .map((code) => ({
            code,
            description: moedasRes[code],
            pais: obterPais(code, moedasRes[code]),
          }))
          .filter((m) => this.moedaService.moedaTemCotacao(m.code))
          .sort((a, b) => a.pais.localeCompare(b.pais, 'pt-BR'));
      },
      error: () => {
        this.moedas = [];
        this.carregandoMoedas = false;
        this.erroMoedas = true;
      },
    });
  }

  get formInvalido(): boolean {
    return (
      !this.moedaSelecionada ||
      !this.moedaConvertida ||
      !this.valor ||
      this.valor <= 0
    );
  }

  inverterMoedas(): void {
    [this.moedaSelecionada, this.moedaConvertida] = [
      this.moedaConvertida,
      this.moedaSelecionada,
    ];
  }

  realizaConversao(): void {
    if (this.formInvalido) {
      return;
    }

    this.convertendo = true;
    this.mensagem = null;

    this.moedaService
      .converter(this.moedaSelecionada, this.moedaConvertida)
      .subscribe({
        next: (res: CotacaoResponse) => {
          this.convertendo = false;
          const key = this.moedaSelecionada + this.moedaConvertida;
          const data = res[key];

          if (!data?.bid) {
            this.resultado = 0;
            this.taxa = 0;
            this.exibirMensagem(
              'erro',
              'Cotação não disponível para o par selecionado.',
            );
            return;
          }

          this.taxa = parseFloat(data.bid);
          this.resultado = this.valor * this.taxa;
          this.exibirMensagem('sucesso', 'Conversão realizada com sucesso!');
          this.calcularResultadoEmDolar();
        },
        error: () => {
          this.convertendo = false;
          this.resultado = 0;
          this.taxa = 0;
          this.exibirMensagem(
            'erro',
            'Não foi possível realizar a conversão. Verifique sua conexão e tente novamente.',
          );
        },
      });
  }

  tentarNovamente(): void {
    this.carregarMoedas();
  }

  private calcularResultadoEmDolar(): void {
    if (this.moedaConvertida === 'USD') {
      this.resultadoEmDolar = this.resultado;
      this.salvarConversao();
      return;
    }

    this.moedaService.converter(this.moedaConvertida, 'USD').subscribe({
      next: (res: CotacaoResponse) => {
        const key = this.moedaConvertida + 'USD';
        const data = res[key];
        this.resultadoEmDolar = data?.bid
          ? this.resultado * parseFloat(data.bid)
          : 0;
        this.salvarConversao();
      },
      error: () => {
        this.resultadoEmDolar = 0;
        this.salvarConversao();
      },
    });
  }

  private salvarConversao(): void {
    const conversao: Conversao = {
      data: new Date(),
      hora: new Date(),
      moedaSelecionada: this.moedaSelecionada,
      moedaConvertida: this.moedaConvertida,
      valor: Number(this.valor),
      taxa: this.taxa,
      resultado: this.resultado,
      resultadoEmDolar: this.resultadoEmDolar,
    };
    this.historicoService.save(conversao);
  }

  private exibirMensagem(tipo: 'sucesso' | 'erro', texto: string): void {
    this.mensagem = { tipo, texto };
    const timeout = tipo === 'sucesso' ? 3000 : 5000;
    setTimeout(() => {
      this.mensagem = null;
    }, timeout);
  }
}
