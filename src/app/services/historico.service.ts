import { Injectable } from '@angular/core';
import { Conversao } from '../interfaces/conversao';

@Injectable({
  providedIn: 'root',
})
export class HistoricoService {
  private readonly CHAVE = 'conversoes';

  getAll(): Conversao[] {
    try {
      const stored = sessionStorage.getItem(this.CHAVE);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  save(conversao: Conversao): void {
    const conversoes = this.getAll();
    conversoes.push(conversao);
    sessionStorage.setItem(this.CHAVE, JSON.stringify(conversoes));
  }

  delete(conversao: Conversao): void {
    const conversoes = this.getAll();
    const index = conversoes.findIndex(
      (c) =>
        new Date(c.data).getTime() === new Date(conversao.data).getTime() &&
        new Date(c.hora).getTime() === new Date(conversao.hora).getTime() &&
        c.moedaSelecionada === conversao.moedaSelecionada &&
        c.moedaConvertida === conversao.moedaConvertida &&
        c.valor === conversao.valor,
    );
    if (index !== -1) {
      conversoes.splice(index, 1);
      sessionStorage.setItem(this.CHAVE, JSON.stringify(conversoes));
    }
  }
}
