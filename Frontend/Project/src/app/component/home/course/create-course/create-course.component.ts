import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dataSub } from 'src/app/interfaces/course/dataSub';
import { dataTec } from 'src/app/interfaces/course/dataTec';
import { CourseService } from 'src/app/services/course.service';
import { status } from 'src/app/interfaces/course/status';
import { DatePipe } from '@angular/common';
import { createCourse } from 'src/app/interfaces/course/createCourse';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogCreateCourseComponent } from '../confirm-dialog-create-course/confirm-dialog-create-course.component';



@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {
  _dataSub: dataSub[] = []
  _dataTec: dataTec[] = []
  message = "";
  action = "";

  status: status[] = [
    { value: 'open', viewvalue: 'StatusOpen' },
    { value: 'close', viewvalue: 'StatusClose' }
  ]

  formCourse: FormGroup
  time_open1: any


  constructor(private _course: CourseService, private fb: FormBuilder, private _snackBar: MatSnackBar,
    private router: Router, public dialog: MatDialog) {


    this.formCourse = this.fb.group({
      Subject: [null, Validators.required],
      Teacher: [null, Validators.required],
      num_seats: [null, Validators.required],
      seat_remaining: [null, Validators.required],
      time_open: [null, Validators.required],
      time_close: [null, Validators.required],
      time_start: [null, Validators.required],
      time_end: [null, Validators.required],
      status: [null, Validators.required],
      total_price: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    this._course.getSubject().subscribe((data) => {
      this._dataSub = data.data
    })

    this._course.getTeacher().subscribe((data) => {
      this._dataTec = data.data
    })
  }

  createCourse() {
    let _time_Open = new DatePipe('en-US').transform(this.formCourse.value.time_open, 'd/M/yyyy')
    let _time_close = new DatePipe('en-US').transform(this.formCourse.value.time_close, 'd/M/yyyy')
    let _time_start = new DatePipe('en-US').transform(this.formCourse.value.time_start, 'd/M/yyyy')
    let _time_end = new DatePipe('en-US').transform(this.formCourse.value.time_end, 'd/M/yyyy')


    const _createCourse: createCourse = {
      sub_ID: this.formCourse.value.Subject,
      tec_ID: this.formCourse.value.Teacher,
      num_seats: this.formCourse.value.num_seats,
      seat_remaining: this.formCourse.value.seat_remaining,
      time_open: _time_Open,
      time_close: _time_close,
      time_start: _time_start,
      time_end: _time_end,
      status: this.formCourse.value.status,
      total_price: this.formCourse.value.total_price
    }

    console.log(this.formCourse.value.time_open)
    this._course.createCourse(_createCourse).subscribe((data) => {
      if (data.message == "บันทึกข้อมูลสำเร็จ") {
        this._snackBar.open(this.message = 'create successed!', this.action = 'close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      } else {
        this._snackBar.open(this.message = 'create failed!', this.action = 'close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
      console.log(data.message)
    });

    this.router.navigate(['/home/course'])

  }

  changeToSeatRemaining() {
    this.formCourse.patchValue({
      seat_remaining: this.formCourse.value.num_seats
    })
  }


  dialogCreateCourse() {
    const dialogRef = this.dialog.open(ConfirmDialogCreateCourseComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result == true) {
        this.createCourse()
      }
    });
  }

  showPrice(value: any) {
    console.log(value.value)
    var item = this._dataSub.find(c => {
      return c.sub_ID == value.value
    })
    this.formCourse.patchValue({
      // time_open: new Date('2023/04/19'),
      total_price: item?.sub_Price
    })
  }
}
