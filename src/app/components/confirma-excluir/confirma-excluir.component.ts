import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirma-excluir',
  templateUrl: './confirma-excluir.component.html',
  styleUrls: [ './confirma-excluir.component.css' ]
})
export class confirmaExcluirComponent {

  constructor(
    public dialogRef: MatDialogRef<confirmaExcluirComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
