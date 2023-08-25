import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { employee } from 'src/app/interfaces/employee/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { ConfirmDialogDeleteEmpComponent } from './confirm-dialog-delete-emp/confirm-dialog-delete-emp.component';





@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  dataEmp: employee[] = [];
  displayedColumns: string[] = ['emp_ID', 'emp_Name', 'emp_Sex', 'emp_Add', 'emp_Mail', 'emp_Tel', 'sta_Name', 'Action']
  dataSource: MatTableDataSource<employee> = new MatTableDataSource<employee>();
  message = "";
  action = "";

  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(private _employee: EmployeeService, public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer, private router: Router,
    private _snackBar: MatSnackBar) { }



  ngOnInit(): void {
    this._employee.getEmployee().subscribe((data) => {
      this.dataEmp = data.data
      this.dataSource = new MatTableDataSource<employee>(this.dataEmp)
      if (this.matPaginator) {
        this.dataSource.paginator = this.matPaginator;
      }
      this.dataSource.sort = this.matSort;
      console.log(this.matSort)
      // if (this.matSort) {
      //   this.dataSource.sort = this.matSort;
      // }
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
    this.searchEmpID(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterName(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchEmpName(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  searchEmpID(event: any) {
    this._employee.searchEmployee(event, "").subscribe((data: any) => {
      this.dataEmp = data.data
    })
  }

  searchEmpName(event: any) {
    this._employee.searchEmployee("", event).subscribe((data: any) => {
      this.dataEmp = data.data
    })
  }

  dialogDeleteEmp(id: string, name: string, sta: string) {
    const dialogRef = this.dialog.open(ConfirmDialogDeleteEmpComponent, {
      data: { id: id, name: name, sta: sta, _name: "Employee" },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result == true) {
        this.DeleteEmp(id, "false");
      }
    });
  }

  DeleteEmp(id: string, sta: string) {
    this._employee.deleteEmployee(id, sta).subscribe((data: any) => {
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

  // editEmp(id: string){
  //   console.log(id)
  //   this.router.navigate(['/home/edit-employee'])
  // }



}
