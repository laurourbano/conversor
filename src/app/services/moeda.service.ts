import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoedaService {

  private readonly api = 'https://api.exchangerate.host';

  constructor(private http: HttpClient) { }

  public gerarCotacao(): Observable<any> {
    return this.http.get<any>(`${ this.api }/symbols`);
  }

  public converter(moedaSelecionada: string, moedaConvertida: string, valor: number) {
    const url = `${ this.api }/convert?from=${ moedaSelecionada }&to=${ moedaConvertida }&amount=${ valor }`;
    return this.http.get(url);
  }

}
