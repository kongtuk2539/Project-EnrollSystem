import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { course } from 'src/app/interfaces/course/course';
import { status } from 'src/app/interfaces/course/status';
import { CourseService } from 'src/app/services/course.service';
import { AuthService } from '../../authen/auth.service';
import { userModel } from 'src/app/interfaces/dataUserAuthen/userModel';
import { GetReportService } from 'src/app/services/get-report.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  dataCourse: course[] = []
  displayedColumns: string[] = ['cou_ID', 'sub_Name', 'tec_Name', 'num_seats', 'seat_remaining', 'time_open', 'time_close', 'time_start', 'time_end', 'status', 'total_price', 'Action']
  dataSource: MatTableDataSource<course> = new MatTableDataSource<course>();
  selectedValue!: string;
  tecID: any = this._router.snapshot.paramMap.get('tec_ID')!
  stuID: any = this._router.snapshot.paramMap.get('stu_ID')!
  user!: userModel

  status: status[] = [
    { value: '', viewvalue: 'AllData' },
    { value: 'open', viewvalue: 'StatusOpen' },
    { value: 'close', viewvalue: 'StatusClose' },

  ]

  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(private _course: CourseService, private _liveAnnouncer: LiveAnnouncer, private router: Router,
    private authService: AuthService, private _router: ActivatedRoute, private reportService: GetReportService) {
    this.user = this.authService.user
    console.log(this.user.id)
  }


  ngOnInit(): void {
    this.getCourseData()
    if (this.stuID && this.stuID == this.user.id) {
      this.getMyCourse()
    } else if (this.stuID && this.stuID != this.user.id) {
      this.router.navigate([`home/course`])
    }

  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilterID(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchStuID(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterStatus(event: any) {
    const filterValue = event;
    this.searchStu(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  searchStuID(event: any) {
    this._course.searchCourse(event, "", "").subscribe((data: any) => {
      this.dataCourse = data.data
    })
  }

  searchStu(stu: any) {
    let status = stu
    this._course.searchCourse("", "", status).subscribe((data: any) => {
      this.dataCourse = data.data
    })
  }

  searchTec() {
    this._course.searchCourse("", this.tecID, "").subscribe((data: any) => {
      this.dataCourse = data.data
      this.dataSource = new MatTableDataSource<course>(this.dataCourse)
      if (this.matPaginator) {
        this.dataSource.paginator = this.matPaginator;
      }
      this.dataSource.sort = this.matSort;
    })
  }

  getCourseData() {
    if (this.tecID != null) {
      if (this.tecID == this.user.id) {
        console.log('tecID ======', this.tecID)
        this.searchTec()
      } else {
        this.router.navigate([`/home`])
      }
    } else {
      console.log('no tecID')
      console.log('tecID ======', this.tecID)
      if (this.user.role == 'Student') {
        this._course.getCourseByStudent().subscribe(async (data) => {
          this.dataCourse = await data.data
          this.dataSource = new MatTableDataSource<course>(this.dataCourse)
          if (this.matPaginator) {
            this.dataSource.paginator = this.matPaginator;
          }
          this.dataSource.sort = this.matSort;
        })

        this.selectedValue = 'open'
        this.applyFilterStatus(this.selectedValue)
      } else {
        this._course.getCourse().subscribe(async (data) => {
          this.dataCourse = await data.data
          this.dataSource = new MatTableDataSource<course>(this.dataCourse)
          if (this.matPaginator) {
            this.dataSource.paginator = this.matPaginator;
          }
          this.dataSource.sort = this.matSort;
        })
      }
    }
  }

  getMyCourse() {
    this._course.getMyCourse(this.stuID, "", "").subscribe((data) => {
      this.dataCourse = data.data
      this.dataSource = new MatTableDataSource<course>(this.dataCourse)
      if (this.matPaginator) {
        this.dataSource.paginator = this.matPaginator;
      }
      this.dataSource.sort = this.matSort;
    })
  }

  printReportStudent(couID: number) {

    let body = {
      stu_ID: "",
      sta_pay: "ชำระเงินเรียบร้อย",
      cou_ID: couID.toString()
    }

    console.log(body)

    this.reportService.getReport('GetEnroll', body).subscribe(async (res) => {
      try {
        let data = res as HttpResponse<Blob>;

        if (data && data.body) {
          const downloadedFile = new Blob([data.body], { type: data.body.type });

          if (downloadedFile.type !== "") {
            const a = document.createElement('a');
            a.style.display = 'none';
            document.body.appendChild(a);
            a.href = URL.createObjectURL(downloadedFile);
            a.target = '_blank';
            a.download = 'report.xls'; // Set desired file name
            a.click();
            document.body.removeChild(a);
          }
        } else {
          console.error('Invalid response or missing body in the response.');
        }
      } catch (error) {
        console.error('Error processing the response:', error);
      }
    });

  }
}
