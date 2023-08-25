import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/dialogData';
import { TeacherComponent } from '../teacher.component';

@Component({
  selector: 'app-confirm-dialog-delete-tec',
  templateUrl: './confirm-dialog-delete-tec.component.html',
  styleUrls: ['./confirm-dialog-delete-tec.component.css']
})
export class ConfirmDialogDeleteTecComponent {
  status = "true";
  message = "";
  action = "";
  namepage = this.data._name

  constructor(public dialogRef: MatDialogRef<TeacherComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
