import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conversao } from 'src/app/interfaces/conversao';

@Injectable({
  providedIn: 'root'
})
export class MoedaService {

private api = 'https://economia.awesomeapi.com.br/json';
  
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
    return this.http.get<any>(`https://economia.awesomeapi.com.br/json/available/uniq`);
  };

  public converter(moedaSelecionada: string, moedaConvertida: string, valor: number): Observable<any> {
    const url = `${this.api}/last/${moedaSelecionada}-${moedaConvertida}`;
    return this.http.get(url);
  };

};
