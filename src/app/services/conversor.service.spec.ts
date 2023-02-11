import { TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { ConversorService } from './conversor.service';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';

describe('ConversorService', () => {
  let service: ConversorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ],
      providers: [ ConversorService ]
    });
    service = TestBed.inject(ConversorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
