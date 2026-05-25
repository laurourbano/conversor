import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MoedaService } from '../../services/moeda.service';
import { ListaComponent } from './lista.component';

describe('ListaComponent', () => {
  let component: ListaComponent;
  let fixture: ComponentFixture<ListaComponent>;

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
      ],
      providers: [MoedaService],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
