import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { student } from 'src/app/interfaces/student/student';
import { StudentService } from 'src/app/services/student.service';
import { ConfirmDialogDeleteStuComponent } from './confirm-dialog-delete-stu/confirm-dialog-delete-stu.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit{
  dataStu: student[] = [];
  displayedColumns: string[] = ['stu_ID', 'stu_Name', 'stu_Sex', 'stu_Add', 'stu_Mail', 'stu_Tel', 'sta_Name', 'Action']
  dataSource: MatTableDataSource<student> = new MatTableDataSource<student>();
  message = "";
  action = "";

  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(private _student: StudentService, private _liveAnnouncer: LiveAnnouncer,
    private _snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    this._student.getStudent().subscribe((data) => {
      this.dataStu = data.data
      this.dataSource = new MatTableDataSource<student>(this.dataStu)
      if (this.matPaginator) {
        this.dataSource.paginator = this.matPaginator;
      }
      this.dataSource.sort = this.matSort;
      console.log(this.matSort)

      console.log(this.dataSource)
    })
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

  applyFilterName(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchStuName(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  searchStuID(event: any) {
    this._student.searchStudent(event, "").subscribe((data: any) => {
      this.dataStu = data.data
    })
  }

  searchStuName(event: any) {
    this._student.searchStudent("", event).subscribe((data: any) => {
      this.dataStu = data.data
    })
  }

  DeleteStu(id: string, sta: string) {
    this._student.deleteStudent(id, sta).subscribe((data: any) => {
      if (data.message == "บันทึกข้อมูลสำเร็จ") {
        this._snackBar.open(this.message = 'delete successed!', this.action = 'close',{
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        this.ngOnInit();
      } else {
        this._snackBar.open(this.message = 'delete failed!', this.action = 'close',{
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
    })
  };

  dialogDeleteStu(id: string, name: string, sta: string) {
    const dialogRef = this.dialog.open(ConfirmDialogDeleteStuComponent, {
      data: { id: id, name: name, sta: sta, _name: "Student" },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result == true) {
        this.DeleteStu(id, "false");
      }
    });
  }

}
