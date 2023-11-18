import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { createTeacher } from 'src/app/interfaces/teacher/createTeacher';
import { TeacherService } from 'src/app/services/teacher.service';
import { ConfirmDialogCreateTecComponent } from '../confirm-dialog-create-tec/confirm-dialog-create-tec.component';
import { DataCreateService } from 'src/app/services/data-create.service';

@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.css']
})
export class CreateTeacherComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  formTec: FormGroup;
  dataTeacher: any;
  showPassword: boolean = false;
  message = "";
  action = "";

  constructor(private fb: FormBuilder, private _teacher: TeacherService, private _snackBar: MatSnackBar,
    private router: Router, public dialog: MatDialog, private apiDatacreate: DataCreateService) {
    this.formTec = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
      sex: ['', Validators.required],
      address: ['', Validators.required],
      tel: ['', [Validators.required, Validators.pattern(/^[0-9]{1,10}$/), this.validateMaxLength.bind(this)]],
    }, {
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

  createTec() {
    const _createTec: createTeacher = {
      tec_Name: this.formTec.value.name,
      tec_Pass: this.formTec.value.password,
      tec_Sex: this.formTec.value.sex,
      tec_Add: this.formTec.value.address,
      tec_Mail: this.emailFormControl.value,
      tec_Tel: this.formTec.value.tel
    }

    this._teacher.createTeacher(_createTec).subscribe(async (data) => {
      if (data.message == "บันทึกข้อมูลสำเร็จ") {
        this.dataTeacher = await data;
        this._snackBar.open(this.message = 'create successed!', this.action = 'close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        this.apiDatacreate.setApiData(this.dataTeacher);
        this.router.navigate(['/home/success-create-teacher'])
      } else {
        this._snackBar.open(this.message = 'create failed!', this.action = 'close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
    });

    this.router.navigate(['/home/teacher'])
  }

  dialogCreateTec() {
    const dialogRef = this.dialog.open(ConfirmDialogCreateTecComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result == true) {
        this.createTec()
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
