import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/dialogData';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';

@Component({
  selector: 'app-confirm-dialog-edit-emp',
  templateUrl: './confirm-dialog-edit-emp.component.html',
  styleUrls: ['./confirm-dialog-edit-emp.component.css']
})
export class ConfirmDialogEditEmpComponent {
  constructor(public dialogRef: MatDialogRef<EditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
