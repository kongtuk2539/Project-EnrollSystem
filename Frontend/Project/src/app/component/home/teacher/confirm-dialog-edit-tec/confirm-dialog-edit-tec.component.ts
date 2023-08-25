import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/dialogData';
import { EditTeacherComponent } from '../edit-teacher/edit-teacher.component';

@Component({
  selector: 'app-confirm-dialog-edit-tec',
  templateUrl: './confirm-dialog-edit-tec.component.html',
  styleUrls: ['./confirm-dialog-edit-tec.component.css']
})
export class ConfirmDialogEditTecComponent {
  constructor(public dialogRef: MatDialogRef<EditTeacherComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
