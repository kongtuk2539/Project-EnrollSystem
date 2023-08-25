import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { editEmployee } from 'src/app/interfaces/employee/editEmployee';
import { EmployeeService } from 'src/app/services/employee.service';
import { __values } from 'tslib';
import { ConfirmDialogEditEmpComponent } from '../confirm-dialog-edit-emp/confirm-dialog-edit-emp.component';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit{
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  formEditEmp: FormGroup;
  message = "";
  action = "";
  showPassword: boolean = false;

  get_empID!: any;

  constructor(private fb: FormBuilder, private router: ActivatedRoute, private serviceEmp: EmployeeService,
    private _snackBar: MatSnackBar, private _router: Router, public dialog: MatDialog){
    this.formEditEmp = this.fb.group({
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
    // console.log(this.formEditValue)
  }

  validateMaxLength(control: FormControl) {
    const maxLength = 10;
    if (control.value && control.value.toString().length > maxLength) {
      console.log(control.value.toString())
      return { maxLengthExceeded: true };
    }
    return null;
  }

  editEmp(){

    const _editEmp: editEmployee = {
      emp_Name: this.formEditEmp.value.name,
      emp_Pass: this.formEditEmp.value.password,
      emp_Sex: this.formEditEmp.value.sex,
      emp_Add: this.formEditEmp.value.address,
      emp_Mail: this.emailFormControl.value,
      emp_Tel: this.formEditEmp.value.tel
    }
    console.log(_editEmp)
    this.serviceEmp.editEmployee(this.get_empID, _editEmp).subscribe(data =>{
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

    this._router.navigate(['/home/employee'])

  }

  ngOnInit(): void {
    this.get_empID = this.router.snapshot.paramMap.get('emp_ID')
    this.serviceEmp.searchEmployee(this.get_empID, "").subscribe(data =>{

      this.formEditEmp.patchValue({
        name:data.data[0].emp_Name,
        password:data.data[0].emp_Pass,
        confirm_password: data.data[0].emp_Pass,
        sex:data.data[0].emp_Sex,
        address:data.data[0].emp_Add,
        tel:data.data[0].emp_Tel
      })
      this.emailFormControl.patchValue(data.data[0].emp_Mail)
    })
  }

  dialogEditEmp () {
    const dialogRef = this.dialog.open(ConfirmDialogEditEmpComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result == true){
        this.editEmp()
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
