import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { createSubject } from 'src/app/interfaces/subject/createSubject';
import { SubjectService } from 'src/app/services/subject.service';
import { ConfirmDialogCreateSubComponent } from '../confirm-dialog-create-sub/confirm-dialog-create-sub.component';

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.css']
})
export class CreateSubjectComponent {
  formSub: FormGroup;
  price!: string;
  message = "";
  action = "";

  constructor (private fb: FormBuilder, private _subject : SubjectService, private _snackBar: MatSnackBar,
    private router: Router, public dialog: MatDialog) {
    this.formSub = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required]
    })
  }

  createSub(){

    this.price = '0' + this.formSub.value.price.toString()

    const _createSub: createSubject = {
      sub_Name: this.formSub.value.name,
      sub_Price: this.price
    }

    console.log(_createSub)

    this._subject.createSubject(_createSub).subscribe((data) => {
      if(data.message == "บันทึกข้อมูลสำเร็จ"){
        this._snackBar.open(this.message = 'create successed!', this.action = 'close',{
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      } else {
        this._snackBar.open(this.message = 'create failed!', this.action = 'close',{
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
      console.log(data.message)
    });

    this.router.navigate(['/home/subject'])
  }

  dialogCreateSub () {
    const dialogRef = this.dialog.open(ConfirmDialogCreateSubComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result == true){
        this.createSub()
      }
      });
  }

}
