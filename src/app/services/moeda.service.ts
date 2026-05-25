import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, timeout, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MoedasDisponiveis, CotacaoResponse } from '../interfaces/api';

const REQUEST_TIMEOUT_MS = 15000;

@Injectable({
  providedIn: 'root',
})
export class MoedaService {
  private readonly baseUrl = 'https://economia.awesomeapi.com.br/json';
  private paresDisponiveis: Record<string, string[]> | null = null;

  constructor(private http: HttpClient) {}

  gerarCotacao(): Observable<MoedasDisponiveis> {
    return this.http
      .get<MoedasDisponiveis>(`${this.baseUrl}/available/uniq`)
      .pipe(
        timeout(REQUEST_TIMEOUT_MS),
        catchError(() => of({})),
      );
  }

  carregarPares(): Observable<void> {
    return this.http
      .get<Record<string, string>>(`${this.baseUrl}/available`)
      .pipe(
        timeout(REQUEST_TIMEOUT_MS),
        map((res) => {
          this.paresDisponiveis = {};
          Object.keys(res).forEach((par) => {
            const [de, para] = par.split('-');
            if (!this.paresDisponiveis![de]) {
              this.paresDisponiveis![de] = [];
            }
            this.paresDisponiveis![de].push(para);
          });
        }),
        catchError(() => {
          this.paresDisponiveis = null;
          return of(undefined);
        }),
      );
  }

  converter(
    moedaSelecionada: string,
    moedaConvertida: string,
  ): Observable<CotacaoResponse> {
    if (moedaSelecionada === moedaConvertida) {
      return of({});
    }

    if (
      this.paresDisponiveis &&
      !this.parExiste(moedaSelecionada, moedaConvertida)
    ) {
      return of({});
    }

    const url = `${this.baseUrl}/last/${moedaSelecionada}-${moedaConvertida}`;
    return this.http.get<CotacaoResponse>(url).pipe(
      timeout(REQUEST_TIMEOUT_MS),
      catchError(() => of({})),
    );
  }

  private parExiste(de: string, para: string): boolean {
    return this.paresDisponiveis?.[de]?.includes(para) ?? true;
  }
}
