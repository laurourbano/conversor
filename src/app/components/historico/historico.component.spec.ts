import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HistoricoService } from '../../services/historico.service';
import { HistoricoComponent } from './historico.component';

describe('HistoricoComponent', () => {
  let component: HistoricoComponent;
  let fixture: ComponentFixture<HistoricoComponent>;
  let historicoService: HistoricoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoricoComponent],
      imports: [
        MatTableModule,
        MatDialogModule,
        MatPaginatorModule,
        MatIconModule,
        BrowserAnimationsModule,
      ],
      providers: [HistoricoService],
    }).compileComponents();

    fixture = TestBed.createComponent(HistoricoComponent);
    component = fixture.componentInstance;
    historicoService = TestBed.inject(HistoricoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load conversoes from historico service', () => {
    spyOn(historicoService, 'getAll').and.returnValue([]);
    component.carregarConversoes();
    expect(historicoService.getAll).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual([]);
  });

  it('should announce sort state change', () => {
    spyOn(component['liveAnnouncer'], 'announce');
    component.anunciarMudancaDeOrdenacao({ direction: 'asc' } as Sort);
    expect(component['liveAnnouncer'].announce).toHaveBeenCalledWith(
      'Sorted ascending',
    );
    component.anunciarMudancaDeOrdenacao({ direction: '' } as Sort);
    expect(component['liveAnnouncer'].announce).toHaveBeenCalledWith(
      'Sorting cleared',
    );
  });
});
