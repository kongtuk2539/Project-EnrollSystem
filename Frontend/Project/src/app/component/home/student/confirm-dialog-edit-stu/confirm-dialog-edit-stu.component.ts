import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/dialogData';
import { EditStudentComponent } from '../edit-student/edit-student.component';

@Component({
  selector: 'app-confirm-dialog-edit-stu',
  templateUrl: './confirm-dialog-edit-stu.component.html',
  styleUrls: ['./confirm-dialog-edit-stu.component.css']
})
export class ConfirmDialogEditStuComponent {
  constructor(public dialogRef: MatDialogRef<EditStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
