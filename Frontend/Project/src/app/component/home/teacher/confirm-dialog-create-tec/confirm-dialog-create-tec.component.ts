import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/dialogData';
import { createTeacher } from 'src/app/interfaces/teacher/createTeacher';

@Component({
  selector: 'app-confirm-dialog-create-tec',
  templateUrl: './confirm-dialog-create-tec.component.html',
  styleUrls: ['./confirm-dialog-create-tec.component.css']
})
export class ConfirmDialogCreateTecComponent {
  constructor(public dialogRef: MatDialogRef<createTeacher>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
