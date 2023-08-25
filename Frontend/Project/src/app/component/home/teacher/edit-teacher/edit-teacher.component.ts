import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { editTeacher } from 'src/app/interfaces/teacher/editTeacher';
import { TeacherService } from 'src/app/services/teacher.service';
import { ConfirmDialogEditTecComponent } from '../confirm-dialog-edit-tec/confirm-dialog-edit-tec.component';

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css']
})
export class EditTeacherComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  formEditTec: FormGroup;
  message = "";
  action = "";
  showPassword: boolean = false;

  get_tecID!: any;

  constructor(private fb: FormBuilder, private router: ActivatedRoute, private serviceTec: TeacherService,
    private _snackBar: MatSnackBar, private _router: Router, public dialog: MatDialog){
    this.formEditTec = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
      sex: ['', Validators.required],
      address: ['', Validators.required],
      tel: ['', [Validators.required, Validators.pattern(/^[0-9]{1,10}$/), this.validateMaxLength.bind(this)]],
    },
    {
      validators: this.passwordsMatchValidator
    })
  }

  validateMaxLength(control: FormControl) {
    const maxLength = 10;
    if (control.value && control.value.toString().length > maxLength) {
      console.log(control.value.toString())
      return { maxLengthExceeded: true };
    }
    return null;
  }

  editTec(){

    const _editTec: editTeacher = {
      tec_Name: this.formEditTec.value.name,
      tec_Pass: this.formEditTec.value.password,
      tec_Sex: this.formEditTec.value.sex,
      tec_Add: this.formEditTec.value.address,
      tec_Mail: this.emailFormControl.value,
      tec_Tel: this.formEditTec.value.tel
    }
    console.log(_editTec)
    this.serviceTec.editTeacher(this.get_tecID, _editTec).subscribe(data =>{
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
    })

    this._router.navigate(['/home/teacher'])
  }

  ngOnInit(): void {

    this.get_tecID = this.router.snapshot.paramMap.get('tec_ID')
    this.serviceTec.searchTeacher(this.get_tecID, "").subscribe(data =>{

      this.formEditTec.patchValue({
        name:data.data[0].tec_Name,
        password:data.data[0].tec_Pass,
        confirm_password: data.data[0].tec_Pass,
        sex:data.data[0].tec_Sex,
        address:data.data[0].tec_Add,
        tel:data.data[0].tec_Tel
      })
      this.emailFormControl.patchValue(data.data[0].tec_Mail)
    })
  }

  dialogEditTec () {
    const dialogRef = this.dialog.open(ConfirmDialogEditTecComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result == true){
        this.editTec()
      }
      });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  passwordsMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password')!;
    const confirmPasswordControl = formGroup.get('confirm_password')!;

    if (passwordControl.value === confirmPasswordControl.value) {
      confirmPasswordControl.setErrors(null);
    } else {
      confirmPasswordControl.setErrors({ passwordsMismatch: true });
    }

    if (passwordControl.value.includes(' ')) {
      passwordControl.setErrors({ containsSpace: true });
    } else {
      passwordControl.setErrors(null);
    }
  }

}
