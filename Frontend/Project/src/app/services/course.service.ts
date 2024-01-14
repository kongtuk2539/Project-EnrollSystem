import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createCourse } from '../interfaces/course/createCourse';
import { dataSub } from '../interfaces/course/dataSub';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  getCourse(): Observable<any> {
    return this.http.post<any>('/api/Course/GetCourse', {
      cou_ID: '',
      status: ''
    })
  }

  getCourseStatusOpen(): Observable<any> {
    return this.http.post<any>('/api/Course/GetCourse', {
      cou_ID: '',
      status: 'open'
    })
  }

  getCourseByStudent(): Observable<any> {
    return this.http.post<any>('/api/Course/GetCourse', {
      cou_ID: '',
      status: 'open'
    })
  }

  searchCourse(searchCouID: string, searchTecID: string, searchStatus: string): Observable<any> {
    return this.http.post('/api/Course/GetCourse', {
      cou_ID: searchCouID,
      tec_ID: searchTecID,
      status: searchStatus
    })
  }

  getMyCourse(stuID: string, statusPay: string, couID: string): Observable<any> {
    return this.http.post('/api/MyCourse/GetEmployee', {
      stu_ID: stuID,
      sta_pay: statusPay,
      cou_ID: couID
    })
  }

  getSubject(): Observable<any> {
    return this.http.get<any>('/api/Course/getSubjectSelect')
  }

  getTeacher(): Observable<any> {
    return this.http.get<any>('/api/Teacher/getTeacherReadyStatus')
  }

  createCourse(formCourse: createCourse): Observable<any> {
    return this.http.post('/api/Course/AddCourseModel', formCourse)
  }

  editCourse(cou_ID: string, formEditCourse: createCourse): Observable<any> {
    return this.http.put('/api/Course/UpdateCourse/' + cou_ID, formEditCourse)
  }

}
