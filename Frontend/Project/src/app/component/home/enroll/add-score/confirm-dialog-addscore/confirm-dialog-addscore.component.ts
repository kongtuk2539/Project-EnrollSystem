import { Component, Inject } from '@angular/core';
import { AddScoreComponent } from '../add-score.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/dialogData';

@Component({
  selector: 'app-confirm-dialog-addscore',
  templateUrl: './confirm-dialog-addscore.component.html',
  styleUrls: ['./confirm-dialog-addscore.component.css']
})
export class ConfirmDialogAddscoreComponent {
  constructor(public dialogRef: MatDialogRef<AddScoreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
