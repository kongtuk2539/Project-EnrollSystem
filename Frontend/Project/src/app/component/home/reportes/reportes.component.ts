import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { GetReportService } from 'src/app/services/get-report.service';
import { saveAs } from 'file-saver'; // Import file-saver for file download
import { HttpResponse } from '@angular/common/http';

interface Report {
  value: string;
  viewValue: string;
  body: object;
}

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent {
  selectedValue!: string;


  constructor(private reportService: GetReportService) {

  }

  report: Report[] = [
    {
      value: 'GetStudent', viewValue: 'รายชื่อนักเรียน', body: {
        stu_ID: "",
        stu_Name: ""
      }
    },
    {
      value: 'GetTeacher', viewValue: 'รายชื่ออาจารย์', body: {

        tec_ID: "",
        tec_Name: ""

      }
    },
    {
      value: 'GetEmployee', viewValue: 'รายชื่อพนักงาน', body: {
        emp_ID: "",
        emp_Name: ""
      }
    },
    {
      value: 'GetCourse', viewValue: 'รายชื่อคอร์สเรียน สถานะ: ทั้งหมด', body: {
        cou_ID: "",
        status: "",
        tec_ID: ""
      }
    },
    {
      value: 'GetCourse', viewValue: 'รายชื่อคอร์สเรียน สถานะ: เปิดลงทะเบียน', body: {
        cou_ID: "",
        status: "open",
        tec_ID: ""
      }
    },
    {
      value: 'GetCourse', viewValue: 'รายชื่อคอร์สเรียน สถานะ: ปิดลงทะเบียน', body: {
        cou_ID: "",
        status: "close",
        tec_ID: ""
      }
    },
    {
      value: 'GetEnroll', viewValue: 'รายชื่อนักเรียนที่ลงทะเบียน สถานะ: ทั้งหมด ', body: {
        stu_ID: "",
        sta_pay: "",
        cou_ID: ""
      }
    },
    {
      value: 'GetEnroll', viewValue: 'รายชื่อนักเรียนที่ลงทะเบียน สถานะ: ยังไม่ชำระ ', body: {
        stu_ID: "",
        sta_pay: "ยังไม่ชำระ",
        cou_ID: ""
      }
    },
    {
      value: 'GetEnroll', viewValue: 'รายชื่อนักเรียนที่ลงทะเบียน สถานะ: รอตรวจสอบ ', body: {
        stu_ID: "",
        sta_pay: "รอตรวจสอบ",
        cou_ID: ""
      }
    },
    {
      value: 'GetEnroll', viewValue: 'รายชื่อนักเรียนที่ลงทะเบียน สถานะ: ส่งหลักฐานการชำระเงินอีกครั้ง ', body: {
        stu_ID: "",
        sta_pay: "โปรดส่งหลักฐานการชำระเงินอีกครั้ง",
        cou_ID: ""
      }
    },
    {
      value: 'GetEnroll', viewValue: 'รายชื่อนักเรียนที่ลงทะเบียน สถานะ: ชำระเงินเรียบร้อย ', body: {
        stu_ID: "",
        sta_pay: "ชำระเงินเรียบร้อย",
        cou_ID: ""
      }
    },
    {
      value: 'GetEnroll', viewValue: 'รายชื่อนักเรียนที่ลงทะเบียน สถานะ: ชำระเงินล่าช้า ', body: {
        stu_ID: "",
        sta_pay: "ชำระเงินล่าช้า",
        cou_ID: ""
      }
    },
    {
      value: 'GetEnroll', viewValue: 'รายชื่อนักเรียนที่ลงทะเบียน สถานะ: ยกเลิกการลงทะเบียน ', body: {
        stu_ID: "",
        sta_pay: "ยกเลิกการลงทะเบียน",
        cou_ID: ""
      }
    },
  ];

  SelectedReport(value: string) {
    console.log('Selected Report Value:', value);
    this.selectedValue = value
  }

  getReport() {
    let info: any = this.selectedValue;

    this.reportService.getReport(info.value, info.body).subscribe(async (res) => {
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
            a.download = 'report.pdf'; // Set desired file name
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



