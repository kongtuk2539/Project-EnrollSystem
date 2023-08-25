import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/dialogData';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';



@Component({
  selector: 'app-confirm-dialog-create-emp',
  templateUrl: './confirm-dialog-create-emp.component.html',
  styleUrls: ['./confirm-dialog-create-emp.component.css']
})
export class ConfirmDialogCreateEmpComponent {

  constructor(public dialogRef: MatDialogRef<CreateEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
