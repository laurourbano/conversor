import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog.component';

describe('DeleteConfirmationDialogComponent', () => {
  let component: DeleteConfirmationDialogComponent;
  let fixture: ComponentFixture<DeleteConfirmationDialogComponent>;
  let dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>;
  const data = {
    conversao: { moedaSelecionada: 'USD', moedaConvertida: 'BRL' },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteConfirmationDialogComponent],
      imports: [MatDialogModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: { close: jasmine.createSpy('close') },
        },
        { provide: MAT_DIALOG_DATA, useValue: data },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteConfirmationDialogComponent);
    dialogRef = TestBed.inject(MatDialogRef);
    component = fixture.componentInstance;
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
