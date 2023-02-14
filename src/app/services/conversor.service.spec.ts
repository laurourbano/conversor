import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConversorService } from './conversor.service';

describe('ConversorService', () => {
  let httpTestingController: HttpTestingController
  let service: ConversorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ConversorService ]
    });
    service = TestBed.inject(ConversorService);
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get data of conversorService', () => {
    const expectedData = [ { USD: 1, EUR: 0.9, GBP: 0.8 } ];
    service.cotacaoAtual().subscribe(data => {
      expect(data).toEqual(expectedData)
    })
    const req = httpTestingController.expectOne('https://api.exchangerate.host/symbols');
    expect(req.request.method).toEqual('GET');
    req.flush(expectedData)
  })

});
