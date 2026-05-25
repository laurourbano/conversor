import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timeout } from 'rxjs';
import { MoedasDisponiveis, CotacaoResponse } from '../interfaces/api';

const REQUEST_TIMEOUT_MS = 15000;

@Injectable({
  providedIn: 'root',
})
export class MoedaService {
  private readonly baseUrl = 'https://economia.awesomeapi.com.br/json';

  constructor(private http: HttpClient) {}

  gerarCotacao(): Observable<MoedasDisponiveis> {
    return this.http
      .get<MoedasDisponiveis>(`${this.baseUrl}/available/uniq`)
      .pipe(timeout(REQUEST_TIMEOUT_MS));
  }

  converter(
    moedaSelecionada: string,
    moedaConvertida: string,
  ): Observable<CotacaoResponse> {
    const url = `${this.baseUrl}/last/${moedaSelecionada}-${moedaConvertida}`;
    return this.http
      .get<CotacaoResponse>(url)
      .pipe(timeout(REQUEST_TIMEOUT_MS));
  }
}
