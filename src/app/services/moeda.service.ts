import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conversao } from 'src/app/interfaces/conversao';

@Injectable({
  providedIn: 'root'
})
export class MoedaService {

  private api = 'https://api.exchangerate.host';

  i!: boolean;
  moedaSelecionada: any;
  moedaConvertida: any;
  valor!: number;
  taxa: any;
  resultado: number = 0;
  data: Date = new Date('pt-BR');
  hora: string = new Date().toLocaleDateString();

  conversoes: Conversao[] = [];
  taxaDollar: any;
  resultadoDollar!: number;

  constructor(private http: HttpClient) { };

  public gerarCotacao(): Observable<any> {
    return this.http.get<any>(`${ this.api }/symbols`);
  };

  public converter(moedaSelecionada: string, moedaConvertida: string, valor: number) {
    const url = `${ this.api }/convert?from=${ moedaSelecionada }&to=${ moedaConvertida }&amount=${ valor }&places=2`;
    return this.http.get(url);
  };

  obterCotacao(moedaSelecionada: string, moedaConvertida: string, valor: number) {
    this.http.get(`https://exchangerate.host/?from=${ moedaSelecionada }&to=${ moedaConvertida }&amount=${ valor }`)
      .subscribe((dados: any) => {
        this.taxa = dados[ 'info' ][ 'rate' ];
        this.resultado = this.valor * this.taxa;
        this.data = new Date();
        console.log(this.data)

      });
  };
};
