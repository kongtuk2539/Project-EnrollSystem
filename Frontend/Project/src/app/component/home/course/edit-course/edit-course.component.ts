import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { dataSub } from 'src/app/interfaces/course/dataSub';
import { dataTec } from 'src/app/interfaces/course/dataTec';
import { CourseService } from 'src/app/services/course.service';
import { status } from 'src/app/interfaces/course/status';
import { DatePipe } from '@angular/common';
import { createCourse } from 'src/app/interfaces/course/createCourse';
import { ConfirmDialogEditCourseComponent } from '../confirm-dialog-edit-course/confirm-dialog-edit-course.component';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  formEditCourse: FormGroup;
  _dataSub: dataSub[] = []
  _dataTec: dataTec[] = []
  message = "";
  action = "";

  status: status[] = [
    { value: 'open', viewvalue: 'StatusOpen' },
    { value: 'close', viewvalue: 'StatusClose' }
  ]

  get_couID!: any;

  constructor(private fb: FormBuilder, private router: ActivatedRoute,
    private serviceCou: CourseService, private _snackBar: MatSnackBar, private _router: Router,
    public dialog: MatDialog){
      this.formEditCourse = this.fb.group({
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

  editCourse(){
    let _time_Open = new DatePipe('en-US').transform(this.formEditCourse.value.time_open, 'd/M/yyyy')
    let _time_close = new DatePipe('en-US').transform(this.formEditCourse.value.time_close, 'd/M/yyyy')
    let _time_start = new DatePipe('en-US').transform(this.formEditCourse.value.time_start, 'd/M/yyyy')
    let _time_end = new DatePipe('en-US').transform(this.formEditCourse.value.time_end, 'd/M/yyyy')


    const _createCourse: createCourse = {
      sub_ID: this.formEditCourse.value.Subject,
      tec_ID: this.formEditCourse.value.Teacher,
      num_seats: this.formEditCourse.value.num_seats,
      seat_remaining: this.formEditCourse.value.seat_remaining,
      time_open: _time_Open,
      time_close: _time_close,
      time_start: _time_start,
      time_end: _time_end,
      status: this.formEditCourse.value.status,
      total_price: this.formEditCourse.value.total_price
    }
    this.serviceCou.editCourse(this.get_couID, _createCourse).subscribe(data =>{
      if(data.message == "บันทึกข้อมูลสำเร็จ"){
        this._snackBar.open(this.message = 'edit successed!', this.action = 'close');
      } else {
        this._snackBar.open(this.message = 'edit failed!', this.action = 'close');
      }
    })

    this._router.navigate(['/home/course'])
  }

  ngOnInit(): void {
      this.get_couID = this.router.snapshot.paramMap.get('cou_ID')

      this.serviceCou.searchCourse(this.get_couID, "", "").subscribe(data =>{
        this.formEditCourse.patchValue({
        Subject: data.data[0].sub_ID,
        Teacher: data.data[0].tec_ID,
        num_seats: data.data[0].num_seats,
        seat_remaining: data.data[0].seat_remaining,
        time_open: data.data[0].time_open,
        time_close: data.data[0].time_close,
        time_start: data.data[0].time_start,
        time_end: data.data[0].time_end,
        status: data.data[0].status,
        total_price: data.data[0].total_price
        })
      })

      this.serviceCou.getSubject().subscribe((data) => {
        this._dataSub = data.data
      })

      this.serviceCou.getTeacher().subscribe((data) => {
        this._dataTec = data.data
      })
  }

  showPrice(value: any){
    console.log(value.value)
    var item = this._dataSub.find(c =>{
      return c.sub_ID == value.value
    })
    this.formEditCourse.patchValue({
      total_price: item?.sub_Price
    })
  }

  dialogEditCourse () {
    const dialogRef = this.dialog.open(ConfirmDialogEditCourseComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result == true){
        this.editCourse()
      }
      });
  }
}
