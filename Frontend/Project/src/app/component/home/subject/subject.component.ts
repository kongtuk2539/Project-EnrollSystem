import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { subject } from 'src/app/interfaces/subject/subject';
import { SubjectService } from 'src/app/services/subject.service';
import { ConfirmDialogDeleteSubComponent } from './confirm-dialog-delete-sub/confirm-dialog-delete-sub.component';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent {
  dataSub: subject[] = [];
  displayedColumns: string[] = ['sub_ID', 'sub_Name', 'sub_Price', 'sta_Name', 'Action']
  dataSource: MatTableDataSource<subject> = new MatTableDataSource<subject>();
  message = "";
  action = "";

  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(private _subject: SubjectService, private _liveAnnouncer: LiveAnnouncer,
    private _snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    this._subject.getSubject().subscribe((data) => {
      this.dataSub = data.data
      this.dataSource = new MatTableDataSource<subject>(this.dataSub)
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
    this.searchSubID(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterName(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchSubName(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  searchSubID(event: any) {
    this._subject.searchSubject(event, "").subscribe((data: any) => {
      this.dataSub = data.data
    })
  }

  searchSubName(event: any) {
    this._subject.searchSubject("", event).subscribe((data: any) => {
      this.dataSub = data.data
    })
  }

  DeleteSub(id: string, sta: string) {
    this._subject.deleteSubject(id, sta).subscribe((data: any) => {
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

  dialogDeleteSub(id: string, name: string, sta: string) {
    const dialogRef = this.dialog.open(ConfirmDialogDeleteSubComponent, {
      data: { id: id, name: name, sta: sta, _name: "Subject" },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result == true) {
        this.DeleteSub(id, "false");
      }
    });
  }

}
