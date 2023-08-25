import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogData } from 'src/app/interfaces/dialogData';
import { EmployeeComponent } from '../employee.component';

@Component({
  selector: 'app-confirm-dialog-delete-emp',
  templateUrl: './confirm-dialog-delete-emp.component.html',
  styleUrls: ['./confirm-dialog-delete-emp.component.css']
})
export class ConfirmDialogDeleteEmpComponent {
  status = "true";
  message = "";
  action = "";
  namepage = this.data._name

  constructor(public dialogRef: MatDialogRef<EmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _snackBar: MatSnackBar,
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
