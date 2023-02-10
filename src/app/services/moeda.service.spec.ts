import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MoedaService } from './moeda.service';

describe('MoedaService', () => {
  let service: MoedaService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ MoedaService ]

    });
    service = TestBed.inject(MoedaService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
