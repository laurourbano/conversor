import {
  Component,
  Inject
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: [ './delete-confirmation-dialog.component.css' ]
})
export class DeleteConfirmationDialogComponent {
  historicoComponent: any;
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(): void {
    if (this.historicoComponent && this.historicoComponent.deleteItem) {
      this.historicoComponent.deleteItem(this.data.item.id).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }
}
