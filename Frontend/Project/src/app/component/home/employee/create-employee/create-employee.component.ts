import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { createEmployee } from 'src/app/interfaces/employee/createEmployee';
import { EmployeeService } from 'src/app/services/employee.service';
import { ConfirmDialogCreateEmpComponent } from '../confirm-dialog-create-emp/confirm-dialog-create-emp.component';
import { DataCreateService } from 'src/app/services/data-create.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit{
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  formEmp: FormGroup;
  message = "";
  action = "";
  dataEmployee: any;
  showPassword: boolean = false;



  constructor (private fb: FormBuilder, private _employee: EmployeeService, private _snackBar: MatSnackBar,
    private router: Router, public dialog: MatDialog, private apiDatacreate: DataCreateService) {
    this.formEmp = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
      sex: ['', Validators.required],
      address: ['', Validators.required],
      tel: ['', [Validators.required, Validators.pattern(/^[0-9]{1,10}$/), this.validateMaxLength.bind(this)]],
    },{
      validators: this.passwordsMatchValidator
    })
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

  createEmp(){
    const _createEmp: createEmployee = {
      emp_Name: this.formEmp.value.name,
      emp_Pass: this.formEmp.value.password,
      emp_Sex: this.formEmp.value.sex,
      emp_Add: this.formEmp.value.address,
      emp_Mail: this.emailFormControl.value,
      emp_Tel: this.formEmp.value.tel
    }

    this._employee.createEmployee(_createEmp).subscribe(async (data) => {
      if(data.message == "บันทึกข้อมูลสำเร็จ"){
        this.dataEmployee = await data;
        this._snackBar.open(this.message = 'create successed!', this.action = 'close',{
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        this.apiDatacreate.setApiData(this.dataEmployee);
        this.router.navigate(['/home/success-create-employee'])
      } else {
        this._snackBar.open(this.message = 'create failed!', this.action = 'close',{
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
    });

    this.router.navigate(['/home/employee'])

  }

  dialogCreateEmp () {
    const dialogRef = this.dialog.open(ConfirmDialogCreateEmpComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result == true){
        this.createEmp()
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
