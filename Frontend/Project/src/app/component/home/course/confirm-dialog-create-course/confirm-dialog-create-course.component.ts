import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/dialogData';
import { CreateCourseComponent } from '../create-course/create-course.component';

@Component({
  selector: 'app-confirm-dialog-create-course',
  templateUrl: './confirm-dialog-create-course.component.html',
  styleUrls: ['./confirm-dialog-create-course.component.css']
})
export class ConfirmDialogCreateCourseComponent {
  constructor(public dialogRef: MatDialogRef<CreateCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
