import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/dialogData';
import { CreateStudentComponent } from '../create-student/create-student.component';

@Component({
  selector: 'app-confirm-dialog-create-stu',
  templateUrl: './confirm-dialog-create-stu.component.html',
  styleUrls: ['./confirm-dialog-create-stu.component.css']
})
export class ConfirmDialogCreateStuComponent {
  constructor(public dialogRef: MatDialogRef<CreateStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
