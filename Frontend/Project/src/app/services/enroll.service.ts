import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enrollStu } from '../interfaces/enroll/enrollStu';
import { checkNameStu } from '../interfaces/enroll/checkNameStu';
import { paySlip } from '../interfaces/enroll/payslip';
import { ConfirmReceiptRequest } from '../interfaces/enroll/ConfirmReceiptRequest';
import { DataScore } from '../interfaces/enroll/dataScore';
import { changeStatusEnroll } from '../interfaces/enroll/changeStatusEnroll';

@Injectable({
  providedIn: 'root'
})
export class EnrollService {

  constructor(private http: HttpClient) { }


  searchCourse(searchCouID: string, searchStatus: string): Observable<any> {
    return this.http.post('/api/Course/GetCourse', {
      cou_ID: searchCouID,
      status: searchStatus
    })
  }

  searchStudent(searchStuID: string, searchStuName: string): Observable<any> {
    return this.http.post('/api/Student/GetStudent', {
      stu_ID: searchStuID,
      stu_Name: searchStuName
    })
  }

  getStudent(): Observable<any> {
    return this.http.post<any>('/api/Student/GetStudent', {
      stu_ID: '',
      stu_Name: ''
    })
  }

  getEnroll(couID: string, stuID: string, staPay: string) {
    return this.http.post<any>('/api/Enroll/GetEnroll', {
      cou_ID: couID,
      stu_ID: stuID,
      sta_pay: staPay
    })
  }

  getReportPayment(couID: string, stuID: string, nameReport: string) {
    return this.http.post<any>('/api/Report/PaymentReceipt/' + nameReport, {
      cou_ID: couID,
      stu_ID: stuID,
      sta_pay: ""
    }, {
      observe: 'response',
      responseType: 'blob' as 'json'
    })
  }

  getReportReceipt(couID: string, stuID: string, nameReport: string) {
    return this.http.post<any>('/api/Report/Receipt/' + nameReport, {
      cou_ID: couID,
      stu_ID: stuID,
      sta_pay: ""
    }, {
      observe: 'response',
      responseType: 'blob' as 'json'
    })
  }

  getCertificate(couID: string, stuID: string, nameReport: string) {
    return this.http.post<any>('/api/Report/Certificate/' + nameReport, {
      cou_ID: couID,
      stu_ID: stuID,
      sta_pay: ""
    }, {
      observe: 'response',
      responseType: 'blob' as 'json'
    })
  }

  cancelEnroll(request: changeStatusEnroll) {
    return this.http.put<any>('/api/Enroll/changeStatusEnroll/', request)
  }

  enroll(Data: enrollStu) {
    return this.http.post<any>('/api/Enroll/Enroll', Data)
  }

  searchEmployee(searchEmpID: string, searchEmpName: string): Observable<any> {
    return this.http.post('/api/Employee/GetEmployee', {
      emp_ID: searchEmpID,
      emp_Name: searchEmpName
    })
  }

  checkNameStu(stu_ID: number, cou_ID: number): Observable<any> {
    let data: checkNameStu
    data!.stu_ID = stu_ID
    data!.cou_ID = cou_ID
    return this.http.post('/api/Enroll/checkNameStu', data!)
  }

  uploadFile(request: any): Observable<any>{
    return this.http.post('/api/Enroll/UploadFile', request)
  }

  PhotoDownload(fileUrl: string) {
    return this.http.get("/api/Enroll/PhotoDownload?fileUrl=" + fileUrl, {
        reportProgress: true,
        observe: 'events',
        responseType: 'blob'
    });
  }

  receiptCheck(couID: string, stuID: string): Observable<any>{
    return this.http.post("/api/Enroll/ReceiptCheck",{
      cou_ID: couID,
      stu_ID: stuID,
      sta_pay: ""
    })
  }

  ConfirmReceipt(data: ConfirmReceiptRequest): Observable<any>{
    return this.http.post("/api/Enroll/ConfirmReceipt", data)
  }

  AddScore(data: DataScore): Observable<any>{
    return this.http.post("/api/Enroll/AddScore", data)
  }

}
