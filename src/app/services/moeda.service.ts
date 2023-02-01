import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionStorage } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { Conversao } from 'src/app/interfaces/conversao';

@Injectable({
  providedIn: 'root'
})
export class MoedaService {

  private api = 'https://api.exchangerate.host';

  @SessionStorage() moedaSelecionada: any;
  @SessionStorage() moedaConvertida: any;
  @SessionStorage() valor!: number;
  @SessionStorage() taxa: any;
  @SessionStorage() resultado: number = 0;
  @SessionStorage() data: string = new Date().toDateString();
  @SessionStorage() hora: string = new Date().toLocaleDateString();
  private conversoes: Conversao[] = []
  sessionStorage: any;

  constructor(private http: HttpClient) { }

  public gerarCotacao(): Observable<any> {
    return this.http.get<any>(`${ this.api }/symbols`);
  }

  public converter(moedaSelecionada: string, moedaConvertida: string, valor: number) {
    const url = `${ this.api }/convert?from=${ moedaSelecionada }&to=${ moedaConvertida }&amount=${ valor }&places=2`;
    console.log(url)
    return this.http.get(url);
  }

  obterCotacao(moedaSelecionada: string, moedaConvertida: string, valor: number) {
    this.http.get(`https://exchangerate.host/?from=${ moedaSelecionada }&to=${ moedaConvertida }&amount=${ valor }`)
      .subscribe((dados: any) => {
        this.taxa = dados[ 'info' ][ 'rate' ];
        this.resultado = this.valor * this.taxa;
        this.data = new Date().toDateString();
        this.hora = new Date().toLocaleTimeString();
      });
  }


}
