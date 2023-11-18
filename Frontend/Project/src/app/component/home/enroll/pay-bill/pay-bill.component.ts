import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, Subject } from 'rxjs';
import { paySlip } from 'src/app/interfaces/enroll/payslip';
import { EnrollService } from 'src/app/services/enroll.service';
import { ConfirmDialogPaybillComponent } from './confirm-dialog-paybill/confirm-dialog-paybill.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pay-bill',
  templateUrl: './pay-bill.component.html',
  styleUrls: ['./pay-bill.component.css']
})
export class PayBillComponent implements OnInit {
  paySlipForm!: FormGroup;
  selectedFile: any = null;
  subjectEmpID: Subject<any> = new Subject();
  get_couID: any = this.router.snapshot.paramMap.get('cou_ID')
  get_stuID: any = this.router.snapshot.paramMap.get('stu_ID')
  HH: any;

  constructor(private enrollSer: EnrollService, private fb: FormBuilder,
    private router: ActivatedRoute, private _snackBar: MatSnackBar, public dialog: MatDialog,
    private routerLink: Router) { }

  ngOnInit(): void {
    this.paySlipForm = this.fb.group({
      cou_ID: ['', Validators.required],
      stu_ID: ['', Validators.required],
      sub_Name: ['', Validators.required],
      stu_Name: ['', Validators.required],
      pay_time: ['', Validators.required],
      pay_date: ['', Validators.required],
      selectedFile: [null, Validators.required],
    })

    this.paySlipForm.patchValue({
      cou_ID: this.get_couID,
      stu_ID: this.get_stuID
    })

    this.enrollSer.searchCourse(this.get_couID, "").subscribe((data => {
      this.paySlipForm.patchValue({
        sub_Name: data.data[0].sub_Name
      })
    }))

    this.enrollSer.searchStudent(this.get_stuID, "").subscribe((data => {
      this.paySlipForm.patchValue({
        stu_Name: data.data[0].stu_Name
      })
    }))

  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile.name)

    this.paySlipForm.patchValue({
      selectedFile: this.selectedFile.name
    })


  }


  confirm() {
    const dataForm = this.paySlipForm
    var formData = new FormData();
    let pay_date = new DatePipe('en-US').transform(dataForm.value.pay_date, 'yyyy/M/d')
    formData.append('cou_ID', dataForm.get('cou_ID')?.value);
    formData.append('stu_ID', dataForm.get('stu_ID')?.value);
    formData.append('pay_time', dataForm.get('pay_time')?.value);
    formData.append('pay_date', pay_date!);
    formData.append('filePaySlip', this.selectedFile);

    console.log(this.selectedFile)
    if (this.selectedFile != undefined) {

      this.enrollSer.uploadFile(formData).subscribe({
        next: (data) => {
          this._snackBar.open(data, 'close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          if (data == "บันทึกข้อมูลเรียบร้อย") {
            this.routerLink.navigate(['/home/enroll-information', dataForm.value.cou_ID, dataForm.value.stu_ID])
          }
        },
        error: (err) => {
          this._snackBar.open(err.error, 'close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          })
        }
      })
    } else {
      this._snackBar.open("โปรดเลือกรูปภาพ", 'close', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })
    }
    console.log(formData)

  }

  dialogPayBill() {
    const dialogRef = this.dialog.open(ConfirmDialogPaybillComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.confirm()
      }
    });
  }


}
