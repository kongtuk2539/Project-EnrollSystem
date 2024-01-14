import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../authen/auth.service';
import { course } from 'src/app/interfaces/course/course';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { CourseService } from 'src/app/services/course.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  dataCourse: course[] = []
  displayedColumns: string[] = ['cou_ID', 'sub_Name', 'tec_Name', 'num_seats', 'seat_remaining', 'time_open', 'time_close', 'time_start', 'time_end', 'status', 'total_price'];
  dataSource: MatTableDataSource<course> = new MatTableDataSource<course>();
  user!: any

  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(private authService: AuthService, private _course: CourseService, private _liveAnnouncer: LiveAnnouncer) {
    this.user = this.authService.user
    console.log('start', this.user)
  }
  ngOnInit(): void {
    if (!this.user) {
      this.getCourseData();
    }
  }

  getCourseData() {
    this._course.getCourseStatusOpen().subscribe(async (data) => {
      this.dataCourse = await data.data
      this.dataSource = new MatTableDataSource<course>(this.dataCourse)
      if (this.matPaginator) {
        this.dataSource.paginator = this.matPaginator;
      }
      this.dataSource.sort = this.matSort;
    })

  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  logout() {
    throw new Error('Method not implemented.');
  }

}
