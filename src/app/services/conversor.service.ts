import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConversorService {

  BaseUrl = 'https://api.exchangerate.host'; // api rest fake
  ultimaCotacao = `${ this.BaseUrl }/latest`;
  symbols = `${ this.BaseUrl }/symbols`

  constructor(private httpClient: HttpClient) { }

  cotacaoAtual(): Observable<any> {
    return this.httpClient.get<any>(this.symbols);
  }

}
