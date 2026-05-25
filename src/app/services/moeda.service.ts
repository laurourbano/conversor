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
  private paresComCotacao: Set<string> | null = null;

  constructor(private http: HttpClient) {}

  gerarCotacao(): Observable<MoedasDisponiveis> {
    return this.http
      .get<MoedasDisponiveis>(`${this.baseUrl}/available/uniq`)
      .pipe(
        timeout(REQUEST_TIMEOUT_MS),
        catchError(() => of({})),
      );
  }

  carregarPares(): Observable<Record<string, string>> {
    return this.http
      .get<Record<string, string>>(`${this.baseUrl}/available`)
      .pipe(
        timeout(REQUEST_TIMEOUT_MS),
        catchError(() => of({} as Record<string, string>)),
      );
  }

  cachePares(disponiveis: Record<string, string>): void {
    this.paresComCotacao = new Set(Object.keys(disponiveis));
  }

  converter(
    moedaSelecionada: string,
    moedaConvertida: string,
  ): Observable<CotacaoResponse> {
    if (moedaSelecionada === moedaConvertida) {
      return of({});
    }

    const par = `${moedaSelecionada}-${moedaConvertida}`;

    if (this.paresComCotacao && !this.paresComCotacao.has(par)) {
      return of({});
    }

    const url = `${this.baseUrl}/last/${par}`;
    return this.http.get<CotacaoResponse>(url).pipe(
      timeout(REQUEST_TIMEOUT_MS),
      catchError(() => {
        if (this.paresComCotacao) {
          this.paresComCotacao.delete(par);
        }
        return of({});
      }),
    );
  }
}
