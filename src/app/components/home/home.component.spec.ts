import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { MoedaService } from '../../services/moeda.service';
import { HistoricoService } from '../../services/historico.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let moedaService: MoedaService;
  let historicoService: HistoricoService;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        MatFormFieldModule,
        HttpClientTestingModule,
        MatSelectModule,
        MatIconModule,
        FormsModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [MoedaService, HistoricoService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    moedaService = TestBed.inject(MoedaService);
    historicoService = TestBed.inject(HistoricoService);
    spyOn(moedaService, 'gerarCotacao').and.returnValue(of({}));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the converter function with the correct arguments', () => {
    spyOn(moedaService, 'converter').and.returnValue(of({}));
    spyOn(historicoService, 'save');

    component.moedaSelecionada = 'USD';
    component.moedaConvertida = 'BRL';
    component.valor = 1000;

    component.realizaConversao();

    expect(moedaService.converter).toHaveBeenCalledWith('USD', 'BRL');
  });

  it('should set resultado and taxa when conversion succeeds', () => {
    spyOn(moedaService, 'converter').and.returnValue(
      of({ USDBRL: { bid: '5.20' } } as any),
    );
    spyOn(historicoService, 'save');

    component.moedaSelecionada = 'USD';
    component.moedaConvertida = 'BRL';
    component.valor = 1000;

    component.realizaConversao();

    expect(component.taxa).toEqual(5.2);
    expect(component.resultado).toEqual(5200);
  });

  it('should display error message when API returns no data', () => {
    spyOn(moedaService, 'converter').and.returnValue(of({}));

    component.moedaSelecionada = 'USD';
    component.moedaConvertida = 'BRL';
    component.valor = 1000;

    component.realizaConversao();

    expect(component.resultado).toEqual(0);
    expect(component.taxa).toEqual(0);
    expect(component.mensagem?.tipo).toBe('erro');
  });

  it('should have formInvalido return true when fields are empty', () => {
    expect(component.formInvalido).toBeTrue();

    component.moedaSelecionada = 'USD';
    component.moedaConvertida = 'BRL';
    component.valor = 100;
    expect(component.formInvalido).toBeFalse();
  });
});
