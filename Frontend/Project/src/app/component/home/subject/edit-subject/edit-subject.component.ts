import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { editSubject } from 'src/app/interfaces/subject/editSubject';
import { SubjectService } from 'src/app/services/subject.service';
import { ConfirmDialogEditSubComponent } from '../confirm-dialog-edit-sub/confirm-dialog-edit-sub.component';

@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.css']
})
export class EditSubjectComponent {
  formEditSub: FormGroup;
  price!: string;
  message = "";
  action = "";

  get_subID!: any;

  constructor(private fb: FormBuilder, private router: ActivatedRoute, private serviceSub: SubjectService,
    private _snackBar: MatSnackBar, private _router: Router, public dialog: MatDialog){
    this.formEditSub = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required]
    })
  }

  editSub(){
    this.price = this.formEditSub.value.price.toString()

    const _editSub: editSubject = {
      sub_Name: this.formEditSub.value.name,
      sub_Price: this.price
    }

    console.log(_editSub)
    this.serviceSub.editSubject(this.get_subID, _editSub).subscribe(data =>{
      if(data.message == "บันทึกข้อมูลสำเร็จ"){
        this._snackBar.open(this.message = 'edit successed!', this.action = 'close',{
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      } else {
        this._snackBar.open(this.message = 'edit failed!', this.action = 'close',{
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
      console.log(data.data)
      console.log(data.message)
    })

    this._router.navigate(['/home/subject'])
  }

  ngOnInit(): void {

    this.get_subID = this.router.snapshot.paramMap.get('sub_ID')

    console.log(this.get_subID)
    this.serviceSub.searchSubject(this.get_subID, "").subscribe(data =>{
      console.log(data.data);
      this.formEditSub.patchValue({
        name:data.data[0].sub_Name,
        price:data.data[0].sub_Price
      })
    })
  }

  dialogEditSub () {
    const dialogRef = this.dialog.open(ConfirmDialogEditSubComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result == true){
        this.editSub()
      }
      });
  }

}
