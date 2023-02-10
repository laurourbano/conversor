import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MoedaService } from './../../services/moeda.service';

import {
  HomeComponent
} from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [ MatFormFieldModule, HttpClientModule, MatSelectModule, MatIconModule ],
      providers: [ MoedaService ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
