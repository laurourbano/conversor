import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmaExcluirComponent } from './confirma-excluir.component';

describe('ConfirmaExcluirComponent', () => {
  let component: ConfirmaExcluirComponent;
  let fixture: ComponentFixture<ConfirmaExcluirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmaExcluirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmaExcluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
