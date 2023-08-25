import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { EnrollService } from 'src/app/services/enroll.service';
import { ConfirmDialogReceiptCheckComponent } from './confirm-dialog-receipt-check/confirm-dialog-receipt-check.component';
import { ConfirmReceiptRequest } from 'src/app/interfaces/enroll/ConfirmReceiptRequest';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-receipt-check',
  templateUrl: './receipt-check.component.html',
  styleUrls: ['./receipt-check.component.css']
})
export class ReceiptCheckComponent implements OnInit {
  get_couID: any = this.router.snapshot.paramMap.get('cou_ID')
  get_stuID: any = this.router.snapshot.paramMap.get('stu_ID')
  fileUrl: Subject<any> = new Subject();
  fileUrlDownload!: string
  receiptForm!: FormGroup;
  src: any;

  constructor(private serviceEnroll: EnrollService, private router: ActivatedRoute, private fb: FormBuilder,
    private _snackBar: MatSnackBar, private routerLink: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.receiptForm = this.fb.group({
      cou_ID: ['', Validators.required],
      sub_Name: ['', Validators.required],
      stu_ID: ['', Validators.required],
      stu_Name: ['', Validators.required],
      amount_pay: ['', Validators.required],
      pay_time: ['', Validators.required],
      pay_date: ['', Validators.required],
      confirmReceipt: ['', Validators.required],
    })



    this.getData()
    this.fileUrl.subscribe(path => {
      this.DownloadDocument(path)
      this.fileUrlDownload = path
    })

  }

  async DownloadDocument(fileDownloadPath: string) {
    this.serviceEnroll.PhotoDownload(fileDownloadPath).subscribe(async (event) => {
      let data = event as HttpResponse<Blob>;
      const downloadedFile = new Blob([data.body as BlobPart], {
        type: data.body?.type
      });
      console.log("downloaded", downloadedFile)
      if (downloadedFile.type != "") {
        this.convertBlobToBase64(downloadedFile)
          .then(base64String => {
            console.log('Base64 string:', base64String);
            this.src = base64String
          })
          .catch(error => {
            console.error(error);
          })
      }
    });
  }

  convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };

      reader.onerror = () => {
        reject('Failed to convert Blob to base64 string');
      };

      reader.readAsDataURL(blob);
    });
  }

  async Download() {
    this.serviceEnroll.PhotoDownload(this.fileUrlDownload).subscribe(async (event) => {
      let data = event as HttpResponse<Blob>;
      const downloadedFile = new Blob([data.body as BlobPart], {
        type: data.body?.type
      });
      console.log("downloaded", downloadedFile)
      if (downloadedFile.type != "") {
        const a = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        a.href = URL.createObjectURL(downloadedFile);
        a.target = '_blank';
        a.click();
        console.log(a)
      }
    });
  }

  loadphoto() {
    this.Download()
  }

  getData() {
    this.serviceEnroll.receiptCheck(this.get_couID, this.get_stuID).subscribe(data => {
      this.fileUrl.next(data.data[0].pay_slip)
      this.receiptForm.patchValue({
        cou_ID: data.data[0].cou_ID,
        sub_Name: data.data[0].sub_Name,
        stu_ID: data.data[0].stu_ID,
        stu_Name: data.data[0].stu_Name,
        amount_pay: data.data[0].amount_pay,
        pay_time: data.data[0].pay_time,
        pay_date: data.data[0].pay_date
      })
    })
  }

  checkReceipt() {
    let dataForm = this.receiptForm.value
    let date = new Date
    let receipt_date = new DatePipe('en-US').transform(date, 'yyyy/M/d')
    let strStuID = dataForm.stu_ID.toString()
    let strCouID = dataForm.cou_ID.toString()
    console.log(receipt_date)
    const _ConfirmReceiptRequest: ConfirmReceiptRequest = {
      stu_ID: strStuID,
      cou_ID: strCouID,
      statusConfirm: dataForm.confirmReceipt,
      receipt_date: receipt_date!
    }
    console.log(_ConfirmReceiptRequest)
    this.serviceEnroll.ConfirmReceipt(_ConfirmReceiptRequest).subscribe(res => {
      if(res.message == 'บันทึกข้อมูลสำเร็จ'){
        this._snackBar.open(res.message, 'close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        this.routerLink.navigate(['/home/enroll-data', dataForm.cou_ID])
      }else{
        this._snackBar.open(res.message, 'close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }

    })
  }

  dialogCreateStu() {
    const dialogRef = this.dialog.open(ConfirmDialogReceiptCheckComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.checkReceipt()
      }

    });
  }

}
