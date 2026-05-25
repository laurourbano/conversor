import { TestBed } from '@angular/core/testing';
import { HistoricoService } from './historico.service';

describe('HistoricoService', () => {
  let service: HistoricoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoricoService);
    sessionStorage.clear();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return empty array when no conversoes stored', () => {
    expect(service.getAll()).toEqual([]);
  });

  it('should save and retrieve conversoes', () => {
    const conversao = {
      data: new Date(),
      hora: new Date(),
      moedaSelecionada: 'USD',
      moedaConvertida: 'BRL',
      valor: 100,
      taxa: 5.2,
      resultado: 520,
      resultadoEmDolar: 100,
    };

    service.save(conversao);
    const result = service.getAll();
    expect(result.length).toBe(1);
    expect(result[0].moedaSelecionada).toBe('USD');
  });

  it('should delete a conversao', () => {
    const conversao = {
      data: new Date(),
      hora: new Date(),
      moedaSelecionada: 'USD',
      moedaConvertida: 'BRL',
      valor: 100,
      taxa: 5.2,
      resultado: 520,
      resultadoEmDolar: 100,
    };
    service.save(conversao);
    expect(service.getAll().length).toBe(1);

    const saved = service.getAll()[0];
    service.delete(saved);
    expect(service.getAll().length).toBe(0);
  });
});
