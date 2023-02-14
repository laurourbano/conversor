import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoricoComponent } from './../historico/historico.component';

import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog.component';

describe('DeleteConfirmationDialogComponent', () => {
  let component: DeleteConfirmationDialogComponent;
  let fixture: ComponentFixture<DeleteConfirmationDialogComponent>;
  let dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>;
  let historicoComponent = jasmine.createSpyObj('HistoricoComponent', [ 'deleteItem' ])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteConfirmationDialogComponent ],
      imports: [ MatDialogModule ],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: { id: 1 } },
        { provide: HistoricoComponent, useValue: historicoComponent }
      ]
    }).compileComponents()
    fixture = TestBed.createComponent(DeleteConfirmationDialogComponent);
    dialogRef = TestBed.get(MatDialogRef);
    component = fixture.componentInstance;
    component.historicoComponent = TestBed.get(HistoricoComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog onNoClick', () => {
    component.onNoClick();
    expect(dialogRef.close).toHaveBeenCalled();
  });

});
