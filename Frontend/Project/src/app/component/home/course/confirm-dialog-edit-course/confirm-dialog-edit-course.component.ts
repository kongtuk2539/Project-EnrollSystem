import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/dialogData';
import { EditEmployeeComponent } from '../../employee/edit-employee/edit-employee.component';

@Component({
  selector: 'app-confirm-dialog-edit-course',
  templateUrl: './confirm-dialog-edit-course.component.html',
  styleUrls: ['./confirm-dialog-edit-course.component.css']
})
export class ConfirmDialogEditCourseComponent {
  constructor(public dialogRef: MatDialogRef<EditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


}
