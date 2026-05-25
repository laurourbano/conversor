import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conversao } from 'src/app/interfaces/conversao';

@Injectable({
  providedIn: 'root'
})
export class MoedaService {

private api = 'https://api.frankfurter.app';
  
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
    return this.http.get<any>(`${ this.api }/currencies`);
  };

  public converter(moedaSelecionada: string, moedaConvertida: string, valor: number): Observable<any> {
    const url = `${ this.api }/latest?amount=${ valor }&from=${ moedaSelecionada }&to=${ moedaConvertida }`;
    return this.http.get(url);
  };

};
