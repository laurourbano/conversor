import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, timeout } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MoedasDisponiveis, CotacaoResponse } from '../interfaces/api';

const REQUEST_TIMEOUT_MS = 15000;

@Injectable({
  providedIn: 'root',
})
export class MoedaService {
  private readonly baseUrl = 'https://economia.awesomeapi.com.br/json';
  private moedasValidas: Set<string> = new Set();

  constructor(private http: HttpClient) {}

  gerarCotacao(): Observable<MoedasDisponiveis> {
    return this.http
      .get<MoedasDisponiveis>(`${this.baseUrl}/available/uniq`)
      .pipe(
        timeout(REQUEST_TIMEOUT_MS),
        catchError(() => of({})),
      );
  }

  cacheMoedas(moedas: string[]): void {
    this.moedasValidas = new Set(moedas);
  }

  converter(
    moedaSelecionada: string,
    moedaConvertida: string,
  ): Observable<CotacaoResponse> {
    if (
      moedaSelecionada === moedaConvertida ||
      (this.moedasValidas.size > 0 &&
        (!this.moedasValidas.has(moedaSelecionada) ||
          !this.moedasValidas.has(moedaConvertida)))
    ) {
      return of({});
    }

    const url = `${this.baseUrl}/last/${moedaSelecionada}-${moedaConvertida}`;
    return this.http.get<CotacaoResponse>(url).pipe(
      timeout(REQUEST_TIMEOUT_MS),
      catchError(() => of({})),
    );
  }
}
