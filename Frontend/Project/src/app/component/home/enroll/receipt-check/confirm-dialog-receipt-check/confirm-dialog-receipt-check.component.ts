import { Component, Inject } from '@angular/core';
import { ReceiptCheckComponent } from '../receipt-check.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/dialogData';

@Component({
  selector: 'app-confirm-dialog-receipt-check',
  templateUrl: './confirm-dialog-receipt-check.component.html',
  styleUrls: ['./confirm-dialog-receipt-check.component.css']
})
export class ConfirmDialogReceiptCheckComponent {
  constructor(public dialogRef: MatDialogRef<ReceiptCheckComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
