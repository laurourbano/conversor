import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MoedaService } from './moeda.service';

describe('MoedaService', () => {
  let service: MoedaService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ MoedaService ]

    });
    service = TestBed.get(MoedaService);
    httpTestingController = TestBed.get(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should execute converter', () => {
    const moedaSelecionada = 'USD';
    const moedaConvertida = 'BRL';
    const valor = 10;
    const url = `https://api.exchangerate.host/convert?from=${ moedaSelecionada }&to=${ moedaConvertida }&amount=${ valor }&places=2`;
    const dubleResult = { rate: 5.43 };

    service.converter(moedaSelecionada, moedaConvertida, valor).subscribe(result => {
      expect(result).toEqual(dubleResult);
    });

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(dubleResult);
  });

  it('should execute obterCotacao return ', ()=>{

  })
});
