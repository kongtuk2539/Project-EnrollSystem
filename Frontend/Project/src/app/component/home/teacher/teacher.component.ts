import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { teacher } from 'src/app/interfaces/teacher/teacher';
import { TeacherService } from 'src/app/services/teacher.service';
import { ConfirmDialogDeleteTecComponent } from './confirm-dialog-delete-tec/confirm-dialog-delete-tec.component';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent {
  dataTec: teacher[] = [];
  displayedColumns: string[] = ['tec_ID', 'tec_Name', 'tec_Sex', 'tec_Add', 'tec_Mail', 'tec_Tel', 'sta_Name', 'Action']
  dataSource: MatTableDataSource<teacher> = new MatTableDataSource<teacher>();
  message = "";
  action = "";

  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(private _teacher: TeacherService, private _liveAnnouncer: LiveAnnouncer,
    private _snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    this._teacher.getTeacher().subscribe((data) => {
      this.dataTec = data.data
      this.dataSource = new MatTableDataSource<teacher>(this.dataTec)
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
    this.searchTecID(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterName(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchTecName(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  searchTecID(event: any) {
    this._teacher.searchTeacher(event, "").subscribe((data: any) => {
      this.dataTec = data.data
    })
  }

  searchTecName(event: any) {
    this._teacher.searchTeacher("", event).subscribe((data: any) => {
      this.dataTec = data.data
    })
  }

  DeleteTec(id: string, sta: string) {
    this._teacher.deleteTeacher(id, sta).subscribe((data: any) => {
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

  dialogDeleteTec(id: string, name: string, sta: string) {
    const dialogRef = this.dialog.open(ConfirmDialogDeleteTecComponent, {
      data: { id: id, name: name, sta: sta, _name: "Teacher" },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result == true) {
        this.DeleteTec(id, "false");
      }
    });
  }

}
