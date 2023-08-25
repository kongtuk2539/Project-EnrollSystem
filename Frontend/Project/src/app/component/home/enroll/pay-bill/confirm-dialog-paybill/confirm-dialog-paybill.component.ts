import { Component, Inject } from '@angular/core';
import { PayBillComponent } from '../pay-bill.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/dialogData';

@Component({
  selector: 'app-confirm-dialog-paybill',
  templateUrl: './confirm-dialog-paybill.component.html',
  styleUrls: ['./confirm-dialog-paybill.component.css']
})
export class ConfirmDialogPaybillComponent {
  constructor(public dialogRef: MatDialogRef<PayBillComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
