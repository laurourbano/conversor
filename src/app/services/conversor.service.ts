import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Conversao } from './../interfaces/conversao';

@Injectable({
  providedIn: 'root'
})
export class ConversorService {

  url = 'https://api.exchangerate.host'; // api rest fake
  requestUrl = `${ this.url }/latest`;

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  public getConversoes(): Observable<Conversao[]> {
    return this.httpClient.get<Conversao[]>(this.requestUrl)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  public salvaConversoes(Conversao: Conversao): Observable<Conversao> {
    return this.httpClient.post<Conversao>(this.requestUrl, JSON.stringify(Conversao), this.httpOptions).pipe(
      retry(2), catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Código do erro: ${ error.status }, ` + `menssagem: ${ error.message }`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}


