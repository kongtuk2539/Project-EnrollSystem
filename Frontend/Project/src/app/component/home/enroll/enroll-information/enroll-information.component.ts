import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnrollIfo } from 'src/app/interfaces/enroll/enroll-Info';
import { EnrollService } from 'src/app/services/enroll.service';

@Component({
  selector: 'app-enroll-information',
  templateUrl: './enroll-information.component.html',
  styleUrls: ['./enroll-information.component.css']
})
export class EnrollInformationComponent implements OnInit{
  get_couID: any = this.router.snapshot.paramMap.get('cou_ID')
  get_stuID: any = this.router.snapshot.paramMap.get('stu_ID')
  numCouID = parseInt(this.get_couID)
  nameStu: any
  dataInfo: EnrollIfo[] = []

  constructor(private router: ActivatedRoute, private enrollSer: EnrollService) {}

  ngOnInit(): void {
    this.enrollSer.getEnroll(this.get_couID,this.get_stuID,"").subscribe(data => {
      this.dataInfo = data.data
    })
  }

  printReportPayment(){
    // let couID = this.router.snapshot.paramMap.get('cou_ID')!
    // let stuID = this.router.snapshot.paramMap.get('stu_ID')!
    this.enrollSer.getReportPayment(this.get_couID, this.get_stuID, "ReportPayment").subscribe(res =>{
      let blob:Blob = res.body as Blob;
      let url=window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  printReportReceipt(){
    // let couID = this.router.snapshot.paramMap.get('cou_ID')!
    // let stuID = this.router.snapshot.paramMap.get('stu_ID')!
    this.enrollSer.getReportReceipt(this.get_couID, this.get_stuID, "ReportReceipt").subscribe(res =>{
      let blob:Blob = res.body as Blob;
      let url=window.URL.createObjectURL(blob);
      window.open(url);
    });
  }


}

