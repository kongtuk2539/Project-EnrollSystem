import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/dialogData';
import { StudentComponent } from '../student.component';

@Component({
  selector: 'app-confirm-dialog-delete-stu',
  templateUrl: './confirm-dialog-delete-stu.component.html',
  styleUrls: ['./confirm-dialog-delete-stu.component.css']
})
export class ConfirmDialogDeleteStuComponent {
  status = "true";
  message = "";
  action = "";
  namepage = this.data._name

  constructor(public dialogRef: MatDialogRef<StudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
