import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoedaService {
  private api = 'https://economia.awesomeapi.com.br/json';

  constructor(private http: HttpClient) {}

  public gerarCotacao(): Observable<any> {
    return this.http.get<any>(
      `https://economia.awesomeapi.com.br/json/available/uniq`,
    );
  }

  public converter(
    moedaSelecionada: string,
    moedaConvertida: string,
    valor: number,
  ): Observable<any> {
    const url = `${this.api}/last/${moedaSelecionada}-${moedaConvertida}`;
    return this.http.get(url);
  }
}
