import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

import { MoedaService } from '../../services/moeda.service';
import { ListaComponent } from './lista.component';

describe('ListaComponent', () => {
  let component: ListaComponent;
  let fixture: ComponentFixture<ListaComponent>;
  let moedaService: MoedaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaComponent],
      imports: [
        MatFormFieldModule,
        MatTableModule,
        HttpClientTestingModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatSortModule,
        MatIconModule,
      ],
      providers: [MoedaService],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaComponent);
    component = fixture.componentInstance;
    moedaService = TestBed.inject(MoedaService);
    spyOn(moedaService, 'gerarCotacao').and.returnValue(
      of({ USD: 'US Dollar', BRL: 'Brazilian Real' } as any),
    );
    spyOn(moedaService, 'carregarPares').and.returnValue(of({} as any));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set erro to true when gerarCotacao returns empty', () => {
    (moedaService.gerarCotacao as jasmine.Spy).and.returnValue(of({} as any));
    component.buscarMoedas();
    expect(component.erro).toBeTrue();
    expect(component.carregando).toBeFalse();
  });

  it('should set erro to true when gerarCotacao fails', () => {
    (moedaService.gerarCotacao as jasmine.Spy).and.returnValue(
      throwError(() => new Error('Network error')),
    );
    component.buscarMoedas();
    expect(component.erro).toBeTrue();
    expect(component.carregando).toBeFalse();
  });

  it('should populate dataSource on successful load', () => {
    component.buscarMoedas();
    expect(component.carregando).toBeFalse();
    expect(component.erro).toBeFalse();
    expect(component.dataSource.data.length).toBe(2);
  });

  it('should apply filter to dataSource', () => {
    component.dataSource.data = [
      { code: 'USD', description: 'United States Dollar' },
      { code: 'BRL', description: 'Brazilian Real' },
    ];
    const event = { target: { value: 'USD' } } as unknown as Event;
    component.aplicarFiltro(event);
    expect(component.dataSource.filter).toBe('usd');
  });

  it('should announce sort changes', () => {
    spyOn(component['liveAnnouncer'], 'announce');
    component.anunciarMudancaDeOrdenacao({ active: 'code', direction: 'asc' });
    expect(component['liveAnnouncer'].announce).toHaveBeenCalledWith(
      'Sorted ascending',
    );
  });
});
