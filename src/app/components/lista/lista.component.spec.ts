import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MoedaService } from './../../services/moeda.service';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ListaComponent } from './lista.component';

describe('ListaComponent', () => {
  let component: ListaComponent;
  let fixture: ComponentFixture<ListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaComponent ],
      imports: [ MatFormFieldModule, MatTableModule, HttpClientTestingModule, MatPaginatorModule, BrowserAnimationsModule, MatInputModule, MatSortModule ],
      providers: [ MoedaService ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should used sortData', () => {
    const dataSource = new MatTableDataSource();
    dataSource.data = [
      { code: 'BTN', description: 'Bhutanese Ngultrum' },
      { code: 'USD', description: 'United States Dollar' },
      { code: 'EGP', description: 'Egyptian Pound' },
      { code: 'BRL', description: 'Brazilian Real' } ];
    const sort: Sort = {
      active: 'code',
      direction: 'asc',
    };

    component.dataSource = dataSource;
    component.ordenaDados(sort);

    expect(component.dataSource.data).toEqual([
      { code: 'BRL', description: 'Brazilian Real' },
      { code: 'BTN', description: 'Bhutanese Ngultrum' },
      { code: 'EGP', description: 'Egyptian Pound' },
      { code: 'USD', description: 'United States Dollar' }
    ])
  })
});
