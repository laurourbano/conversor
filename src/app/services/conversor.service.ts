import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConversorService {

  private readonly BaseUrl = 'https://api.exchangerate.host';
  //private readonly ultimaCotacao = `${ this.BaseUrl }/latest`;
  private readonly symbols = `${ this.BaseUrl }/symbols`

  constructor(private httpClient: HttpClient) { }

  cotacaoAtual(): Observable<any> {
    return (this.httpClient.get<any>(this.symbols));
  }

}
