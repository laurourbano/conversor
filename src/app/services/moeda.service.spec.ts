import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MoedaService } from './moeda.service';

describe('MoedaService', () => {
  let service: MoedaService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MoedaService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should execute converter', () => {
    const moedaSelecionada = 'USD';
    const moedaConvertida = 'BRL';
    const url = `https://economia.awesomeapi.com.br/json/last/USD-BRL`;
    const dubleResult = { USDBRL: { bid: '5.43' } } as any;

    service.converter(moedaSelecionada, moedaConvertida).subscribe((result) => {
      expect(result).toEqual(dubleResult);
    });

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(dubleResult);
  });

  it('should execute gerarCotacao', () => {
    const dubleResult = { USD: 'United States Dollar', BRL: 'Brazilian Real' };

    service.gerarCotacao().subscribe((result) => {
      expect(result).toEqual(dubleResult);
    });

    const req = httpTestingController.expectOne(
      'https://economia.awesomeapi.com.br/json/available/uniq',
    );
    expect(req.request.method).toBe('GET');
    req.flush(dubleResult);
  });
});
