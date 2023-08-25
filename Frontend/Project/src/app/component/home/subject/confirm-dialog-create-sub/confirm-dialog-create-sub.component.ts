import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/dialogData';
import { createSubject } from 'src/app/interfaces/subject/createSubject';

@Component({
  selector: 'app-confirm-dialog-create-sub',
  templateUrl: './confirm-dialog-create-sub.component.html',
  styleUrls: ['./confirm-dialog-create-sub.component.css']
})
export class ConfirmDialogCreateSubComponent {
  constructor(public dialogRef: MatDialogRef<createSubject>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
