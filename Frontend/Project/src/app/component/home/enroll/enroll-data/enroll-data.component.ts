import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { dataenroll } from 'src/app/interfaces/enroll/enroll';
import { EnrollService } from 'src/app/services/enroll.service';
import { status } from 'src/app/interfaces/course/status';
import { staEnroll } from 'src/app/interfaces/statusEnroll';
import { StatusEnrollService } from 'src/app/services/status-enroll.service';
import { checkNameStu } from 'src/app/interfaces/enroll/checkNameStu';
import { AuthService } from 'src/app/component/authen/auth.service';
import { userModel } from 'src/app/interfaces/dataUserAuthen/userModel';
import { changeStatusEnroll } from 'src/app/interfaces/enroll/changeStatusEnroll';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogCancelComponent } from './confirm-dialog-cancel/confirm-dialog-cancel.component';

@Component({
  selector: 'app-enroll-data',
  templateUrl: './enroll-data.component.html',
  styleUrls: ['./enroll-data.component.css']
})
export class EnrollDataComponent implements OnInit {
  dataEnroll: dataenroll[] = [];
  couID: any = this.router.snapshot.paramMap.get('cou_ID')!
  stuID: any = this.router.snapshot.paramMap.get('stu_ID')!
  SubName: string = ''
  TecName: string = ''
  displayedColumns: string[] = ['stu_ID', 'stu_Name', 'sta_pay', 'score_learn', 'score_1', 'score_2', 'score_3', 'score_final', 'score_total', 'result', 'Action']
  dataSource: MatTableDataSource<dataenroll> = new MatTableDataSource<dataenroll>();
  message = "";
  action = "";
  selectedValue!: string;
  user!: userModel

  // status: status[] = [
  //   { value: '', viewvalue: 'ข้อมูลทั้งหมด' },
  //   { value: 'ยังไม่ชำระ', viewvalue: 'ยังไม่ชำระ' },
  //   { value: 'รอตรวจสอบ', viewvalue: 'รอตรวจสอบ' },
  //   { value: 'ชำระเงินเรียบร้อย', viewvalue: 'ชำระเงินเรียบร้อย' }
  // ]

  status: staEnroll[] = []

  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;



  constructor(private enrollSer: EnrollService, private _liveAnnouncer: LiveAnnouncer, private router: ActivatedRoute,
    private staService: StatusEnrollService, private authService:AuthService, private _snackBar: MatSnackBar,
    public dialog: MatDialog) {
      this.user = this.authService.user
      console.log(this.user.id)
    }

  ngOnInit(): void {
    if(this.stuID != null){
      this.enrollSer.getEnroll(this.couID,this.stuID,"").subscribe(data => {
        this.dataEnroll = data.data
        this.SubName = data.data[0].sub_Name
        this.TecName = data.data[0].tec_Name
        this.dataSource = new MatTableDataSource<dataenroll>(this.dataEnroll)
        if (this.matPaginator){
          this.dataSource.paginator = this.matPaginator;
        }
        this.dataSource.sort = this.matSort;
      })
    } else {
      console.log('not stuID')
      console.log(this.couID)
      this.enrollSer.getEnroll(this.couID,"","").subscribe(data => {
        this.dataEnroll = data.data
        this.SubName = data.data[0].sub_Name
        this.TecName = data.data[0].tec_Name
        this.dataSource = new MatTableDataSource<dataenroll>(this.dataEnroll)
        if (this.matPaginator){
          this.dataSource.paginator = this.matPaginator;
        }
        this.dataSource.sort = this.matSort;
      })
    }
    this.loadStatus();
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

  searchStuID(event: any) {
    this.enrollSer.getEnroll("", event, "").subscribe((data: any) => {
      this.dataEnroll = data.data
    })
  }

  applyFilterStatus(event: any) {
    const filterValue = event;
    this.searchStu(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  searchStu(stu: any) {
    this.enrollSer.getEnroll("", "", stu).subscribe((data: any) => {
      this.dataEnroll = data.data
    })
  }

  loadStatus(){
    this.staService.getSta().subscribe(data => {
      this.status = data;
    })
  }

  Checkname(stu_ID: number, cou_ID: number){

    this.enrollSer.checkNameStu(stu_ID, cou_ID).subscribe(res =>{
      console.log(res.message)
    })
  }

  printCertificate(cou_ID: number, stu_ID: number){
    let couID = cou_ID.toString()
    let stuID = stu_ID.toString()
    console.log(couID)
    this.enrollSer.getCertificate(couID, stuID, "Certificate").subscribe(res =>{
      let blob:Blob = res.body as Blob;
      let url=window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  cancelEnroll(cou_ID: number, stu_ID: number) {
    const request: changeStatusEnroll = {
      stu_ID: stu_ID.toString(),
      cou_ID: cou_ID.toString(),
      statusConfirm: 'ยกเลิกการลงทะเบียน'
    }

    this.enrollSer.cancelEnroll(request).subscribe(res => {
      if(res.message == 'บันทึกข้อมูลสำเร็จ'){
        this._snackBar.open('บันทึกการเปลี่ยนแปลงสถานะสำเร็จ', 'close',{
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      } else {
        this._snackBar.open('บันทึกการเปลี่ยนแปลงสถานะไม่สำเร็จ!', 'close',{
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
    })
  }

  dialogCancelEnroll (cou_ID: number, stu_ID: number) {
    const dialogRef = this.dialog.open(ConfirmDialogCancelComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
        this.cancelEnroll(cou_ID, stu_ID)
      }
      });
  }

}
