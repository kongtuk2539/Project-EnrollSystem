import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/dialogData';
import { EditSubjectComponent } from '../edit-subject/edit-subject.component';

@Component({
  selector: 'app-confirm-dialog-edit-sub',
  templateUrl: './confirm-dialog-edit-sub.component.html',
  styleUrls: ['./confirm-dialog-edit-sub.component.css']
})
export class ConfirmDialogEditSubComponent {
  constructor(public dialogRef: MatDialogRef<EditSubjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
