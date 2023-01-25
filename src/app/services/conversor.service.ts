import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Conversao } from './../interfaces/conversao';

@Injectable({
  providedIn: 'root'
})
export class ConversorService {

  constructor(private http: HttpClient) { }

  public getListaConversoes(): Observable<Conversao[]> {
    const url = `${ environment.conversorApiUrl }/latest`;
    return this.http.get<Conversao[]>(url);
  }
}
