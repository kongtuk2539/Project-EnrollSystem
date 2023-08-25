import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, Subject } from 'rxjs';
import { course } from 'src/app/interfaces/course/course';
import { enrollStu } from 'src/app/interfaces/enroll/enrollStu';
import { student } from 'src/app/interfaces/student/student';
import { subject } from 'src/app/interfaces/subject/subject';
import { EnrollService } from 'src/app/services/enroll.service';
import { ConfirmDialogEnrollComponent } from './confirm-dialog-enroll/confirm-dialog-enroll.component';

@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.css']
})
export class EnrollComponent implements OnInit {
  dataCourse: course[] = [];
  subjectStuID: Subject<any> = new Subject();
  subID?: number
  dataStu: student[] = [];
  dataSource: MatTableDataSource<student> = new MatTableDataSource<student>();
  formEnroll!: FormGroup
  get_couID: any


constructor(private enrollSer: EnrollService, private fb: FormBuilder, private router: ActivatedRoute,
  private _snackBar: MatSnackBar, private routerLink: Router, public dialog: MatDialog) {
  this.formEnroll = this.fb.group({
    cou_ID: [null, Validators.required],
    sub_Name: [null, Validators.required],
    tec_Name: [null, Validators.required],
    stu_ID: [null, Validators.required],
    stu_Name: [null, Validators.required],
    amount_pay: [null, Validators.required]
  })
}

ngOnInit(): void {
  let couID = this.router.snapshot.paramMap.get('cou_ID')!

  this.enrollSer.searchCourse(couID, "").subscribe((data) => {

    this.formEnroll.patchValue({
      cou_ID: data.data[0].cou_ID,
      sub_Name: data.data[0].sub_Name,
      tec_Name: data.data[0].tec_Name,
      amount_pay: data.data[0].total_price
    })
    this.subID = data.data[0].sub_ID
  })


  this.subjectStuID.pipe(debounceTime(400)).subscribe(term =>{
    if (term.length == 4 && term.includes("3") ){
      this.enrollSer.searchStudent(term, "").subscribe((data: any) => {
        let stuName = data.data

        if(stuName.length > 2){
          this.formEnroll.patchValue({
            stu_Name: ''
          })
        } else{
          this.formEnroll.patchValue({
            stu_Name: stuName[0].stu_Name
          })
        }
      })

    }else{
      this.formEnroll.patchValue({
        stu_Name: ''
      })
    }
  })

  }

  onKeyUp(event: any){
    this.subjectStuID.next(event.target.value)
  }


  Enroll(){
    let dataForm = this.formEnroll.value
    let strCouID: string = dataForm.cou_ID.toString()

    this.enrollSer.getEnroll(strCouID,dataForm.stu_ID,"").subscribe(data =>{
      let Data = data.data
      let DataMes = data.message

      if(Data != null){
        this._snackBar.open('เกิดข้อผิดพลาดเนื่องจากนักศึกษาลงทะเบียนแล้ว!', 'close',{
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }else if(Data == null)
      {
        let DataEnroll: enrollStu = dataForm
        DataEnroll.sub_ID = this.subID
        DataEnroll.sta_pay = "ยังไม่ชำระ"
        console.log(DataEnroll)
        this.enrollSer.enroll(DataEnroll).subscribe(data =>{
          this._snackBar.open(data.message, 'close',{
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          if(data.message == "บันทึกข้อมูลสำเร็จ"){
            this.routerLink.navigate(['/home/enroll-information',dataForm.cou_ID, dataForm.stu_ID])
          }
        })
      }

    })
  }

  dialogEnroll () {
    const dialogRef = this.dialog.open(ConfirmDialogEnrollComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
        this.Enroll()
      }
      });
  }

}

