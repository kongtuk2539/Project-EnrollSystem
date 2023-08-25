import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/dialogData';
import { SubjectComponent } from '../subject.component';

@Component({
  selector: 'app-confirm-dialog-delete-sub',
  templateUrl: './confirm-dialog-delete-sub.component.html',
  styleUrls: ['./confirm-dialog-delete-sub.component.css']
})
export class ConfirmDialogDeleteSubComponent {
  status = "true";
  message = "";
  action = "";
  namepage = this.data._name

  constructor(public dialogRef: MatDialogRef<SubjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
