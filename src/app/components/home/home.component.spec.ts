import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MoedaService } from './../../services/moeda.service';

import { By } from '@angular/platform-browser';
import { of } from 'rxjs/internal/observable/of';
import {
  HomeComponent
} from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let moedaService: MoedaService
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [ MatFormFieldModule, HttpClientTestingModule, MatSelectModule, MatIconModule, FormsModule, MatInputModule, BrowserAnimationsModule ],
      providers: [ MoedaService ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    moedaService = TestBed.inject(MoedaService);
    spyOn(moedaService, 'converter').and.returnValue(of({ 'info': 1.5, 'result': 1500 }))
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the converter function with the correct arguments', () => {
    component.moedaSelecionada = 'USD';
    component.moedaConvertida = 'BRL';
    component.valor = 1000;

    component.realizaConversao();

    expect(moedaService.converter).toHaveBeenCalledWith('USD', 'BRL', 1000);
  });


  it('should call converter of moedas when submit button was clicked', () => {
    component.moedaSelecionada = 'USD';
    component.moedaConvertida = 'BRL';
    component.valor = 1000;
    component.realizaConversao()
    fixture.detectChanges();
    fixture.debugElement.query(By.css('.btn-success')).triggerEventHandler('click, null');
    expect(moedaService.converter).toHaveBeenCalledWith('USD', 'BRL', 1000);
    expect(component.resultado).toEqual(1500);
  })



});
