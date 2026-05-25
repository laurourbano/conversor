import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MoedasDisponiveis, CotacaoResponse } from '../interfaces/api';

@Injectable({
  providedIn: 'root',
})
export class MoedaService {
  private readonly baseUrl = 'https://economia.awesomeapi.com.br/json';

  constructor(private http: HttpClient) {}

  gerarCotacao(): Observable<MoedasDisponiveis> {
    return this.http.get<MoedasDisponiveis>(`${this.baseUrl}/available/uniq`);
  }

  converter(
    moedaSelecionada: string,
    moedaConvertida: string,
  ): Observable<CotacaoResponse> {
    const url = `${this.baseUrl}/last/${moedaSelecionada}-${moedaConvertida}`;
    return this.http.get<CotacaoResponse>(url);
  }
}
