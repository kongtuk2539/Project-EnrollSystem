import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/dialogData';
import { EnrollComponent } from '../../enroll.component';

@Component({
  selector: 'app-confirm-dialog-cancel',
  templateUrl: './confirm-dialog-cancel.component.html',
  styleUrls: ['./confirm-dialog-cancel.component.css']
})
export class ConfirmDialogCancelComponent {
  constructor(public dialogRef: MatDialogRef<EnrollComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
