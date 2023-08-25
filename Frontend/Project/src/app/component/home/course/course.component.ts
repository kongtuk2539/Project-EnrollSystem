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
  user!: userModel

  status: status[] = [
    { value: '', viewvalue: 'AllData' },
    { value: 'open', viewvalue: 'StatusOpen' },
    { value: 'close', viewvalue: 'StatusClose' },

  ]

  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(private _course: CourseService, private _liveAnnouncer: LiveAnnouncer, private router: Router,
    private authService:AuthService, private _router: ActivatedRoute)
    {
      this.user = this.authService.user
      console.log(this.user.id)
    }


  ngOnInit(): void {
    this.getCourseData()

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
    if(this.tecID != null){
      if(this.tecID == this.user.id) {
        this.searchTec()
      }else {
        window.alert('You are not authorized')
        this.router.navigate([`/home`])
      }
    } else {
      console.log('no tecID')
      this._course.getCourse().subscribe((data) => {
        this.dataCourse = data.data
        this.dataSource = new MatTableDataSource<course>(this.dataCourse)
        if (this.matPaginator) {
          this.dataSource.paginator = this.matPaginator;
        }
        this.dataSource.sort = this.matSort;
      })
    }
  }
}
