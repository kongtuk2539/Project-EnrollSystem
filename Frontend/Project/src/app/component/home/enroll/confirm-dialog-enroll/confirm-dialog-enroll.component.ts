import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/dialogData';
import { EnrollComponent } from '../enroll.component';

@Component({
  selector: 'app-confirm-dialog-enroll',
  templateUrl: './confirm-dialog-enroll.component.html',
  styleUrls: ['./confirm-dialog-enroll.component.css']
})
export class ConfirmDialogEnrollComponent {
  constructor(public dialogRef: MatDialogRef<EnrollComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
