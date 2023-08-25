import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { createStudent } from 'src/app/interfaces/student/createStudent';
import { StudentService } from 'src/app/services/student.service';
import { ConfirmDialogCreateStuComponent } from '../confirm-dialog-create-stu/confirm-dialog-create-stu.component';
import { DataCreateService } from 'src/app/services/data-create.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  formStu: FormGroup;
  currentUrl = this.router.url
  dataStudent: any;
  message = "";
  action = "";
  showPassword: boolean = false;

  constructor(private fb: FormBuilder, private _student: StudentService, private _snackBar: MatSnackBar,
    private router: Router, public dialog: MatDialog, private apiDatacreate: DataCreateService) {
    this.formStu = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
      sex: ['', Validators.required],
      address: ['', Validators.required],
      tel: ['', [Validators.required, Validators.pattern(/^[0-9]{1,10}$/), this.validateMaxLength.bind(this)]]
    }, {
      validators: this.passwordsMatchValidator
    });
  }
  ngOnInit(): void {
  }

  validateMaxLength(control: FormControl) {
    const maxLength = 10;
    if (control.value && control.value.toString().length > maxLength) {
      console.log(control.value.toString())
      return { maxLengthExceeded: true };
    }
    return null;
  }


  createStu() {
    const _createStu: createStudent = {
      stu_Name: this.formStu.value.name,
      stu_Pass: this.formStu.value.password,
      stu_Sex: this.formStu.value.sex,
      stu_Add: this.formStu.value.address,
      stu_Mail: this.emailFormControl.value,
      stu_Tel: this.formStu.value.tel
    }

    this._student.createStudent(_createStu).subscribe(async (data) => {
      if (data.message == "บันทึกข้อมูลสำเร็จ") {
        this.dataStudent = await data;
        this._snackBar.open(this.message = 'create successed!', this.action = 'close',{
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        this.apiDatacreate.setApiData(this.dataStudent);
        if (this.currentUrl === "/create-student") {
          this.router.navigate(['/success-create-student'])
        } else {
          this.router.navigate(['/home/success-create-student'])
        }


      } else {
        this._snackBar.open(this.message = 'create failed!', this.action = 'close',{
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        this.router.navigate(['/home/student'])
      }
      console.log(data.message)
    });
  }

  dialogCreateStu() {
    const dialogRef = this.dialog.open(ConfirmDialogCreateStuComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result == true) {
        this.createStu()
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
