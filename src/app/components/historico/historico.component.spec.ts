import { Conversao } from './../../interfaces/conversao';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { of } from 'rxjs';
import { HistoricoComponent } from './historico.component';

describe('HistoricoComponent', () => {
  let component: HistoricoComponent;
  let fixture: ComponentFixture<HistoricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoComponent ],
      imports: [ MatTableModule, MatDialogModule, MatPaginatorModule, MatIconModule, BrowserAnimationsModule, ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should configure table', () => {
    component.conversoes = [ { data: new Date(), hora: new Date(), moedaSelecionada: 'USD', moedaConvertida: 'BRL', valor: 100, taxa: 5.2, resultado: 520, resultadoEmDolar: 100 } ];
    component.configuraTabela();
    expect(component.dataSource.data).toEqual(component.conversoes);
    expect(component.dataSource.sort).toEqual(component.sort);
    expect(component.dataSource.paginator).toEqual(component.paginator);
  });



  it('should announce sort state change', () => {
    spyOn(component._liveAnnouncer, 'announce');
    component.anunciarMudancaDeOrdenacao({ direction: 'asc' } as Sort);
    expect(component._liveAnnouncer.announce).toHaveBeenCalledWith('Sorted ascending');
    component.anunciarMudancaDeOrdenacao({ direction: 'desc' } as Sort);
    expect(component._liveAnnouncer.announce).toHaveBeenCalledWith('Sorted descending');
    component.anunciarMudancaDeOrdenacao({ direction: '' } as Sort);
    expect(component._liveAnnouncer.announce).toHaveBeenCalledWith('Sorting cleared');
  });

});
