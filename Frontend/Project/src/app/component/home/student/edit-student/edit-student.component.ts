import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { editStudent } from 'src/app/interfaces/student/editStudent';
import { StudentService } from 'src/app/services/student.service';
import { ConfirmDialogEditStuComponent } from '../confirm-dialog-edit-stu/confirm-dialog-edit-stu.component';
import { userModel } from 'src/app/interfaces/dataUserAuthen/userModel';
import { AuthService } from 'src/app/component/authen/auth.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  formEditStu: FormGroup;
  message = "";
  action = "";
  showPassword: boolean = false;
  user!: userModel

  get_stuID!: any;

  constructor(private fb: FormBuilder, private router: ActivatedRoute, private serviceStu: StudentService,
    private _snackBar: MatSnackBar, private _router: Router, public dialog: MatDialog, private authService: AuthService) {
    this.user = this.authService.user
    this.formEditStu = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
      sex: ['', Validators.required],
      address: ['', Validators.required],
      tel: ['', [Validators.required, Validators.pattern(/^[0-9]{1,10}$/), this.validateMaxLength.bind(this)]],
    },
      {
        validators: this.passwordsMatchValidator
      });
  }

  validateMaxLength(control: FormControl) {
    const maxLength = 10;
    if (control.value && control.value.toString().length > maxLength) {
      console.log(control.value.toString())
      return { maxLengthExceeded: true };
    }
    return null;
  }

  editStu() {

    const _editStu: editStudent = {
      stu_Name: this.formEditStu.value.name,
      stu_Pass: this.formEditStu.value.password,
      stu_Sex: this.formEditStu.value.sex,
      stu_Add: this.formEditStu.value.address,
      stu_Mail: this.emailFormControl.value,
      stu_Tel: this.formEditStu.value.tel
    }
    console.log(_editStu)
    this.serviceStu.editStudent(this.get_stuID, _editStu).subscribe(data => {
      if (data.message == "บันทึกข้อมูลสำเร็จ") {
        this._snackBar.open(this.message = 'edit successed!', this.action = 'close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      } else {
        this._snackBar.open(this.message = 'edit failed!', this.action = 'close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
      console.log(data.data)
      console.log(data.message)
    })

    if (this.user.role == "Employee") {
      this._router.navigate(['/home/student'])
    } else {
      this._router.navigate(['/home'])
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {

    this.get_stuID = this.router.snapshot.paramMap.get('stu_ID')

    console.log(this.get_stuID)
    if (this.user.role == "Employee" || (this.user.role == "Student" && this.get_stuID == this.user.id)) {
      this.serviceStu.searchStudent(this.get_stuID, "").subscribe(data => {
        console.log(data.data);
        this.formEditStu.patchValue({
          name: data.data[0].stu_Name,
          password: data.data[0].stu_Pass,
          confirm_password: data.data[0].stu_Pass,
          sex: data.data[0].stu_Sex,
          address: data.data[0].stu_Add,
          tel: data.data[0].stu_Tel
        })
        this.emailFormControl.patchValue(data.data[0].stu_Mail)
      })
    } else {
      this._router.navigate(['/home'])
    }
  }

  dialogEditStu() {
    const dialogRef = this.dialog.open(ConfirmDialogEditStuComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result == true) {
        this.editStu()
      }
    });
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
