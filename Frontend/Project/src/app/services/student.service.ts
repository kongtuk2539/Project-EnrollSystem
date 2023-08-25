import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createStudent } from '../interfaces/student/createStudent';
import { editStudent } from '../interfaces/student/editStudent';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getStudent(): Observable<any> {
    return this.http.post<any>('/api/Student/GetStudent', {
      stu_ID: '',
      stu_Name: ''
    })
  }

  searchStudent(searchStuID: string, searchStuName: string): Observable<any> {
    return this.http.post('/api/Student/GetStudent', {
      stu_ID: searchStuID,
      stu_Name: searchStuName
    })
  }

  createStudent(formStu: createStudent): Observable<any> {
    return this.http.post('/api/Student/AddStudentModel', {
      stu_Pass: formStu.stu_Pass,
      stu_Name: formStu.stu_Name,
      stu_Sex: formStu.stu_Sex,
      stu_Add: formStu.stu_Add,
      stu_Mail: formStu.stu_Mail,
      stu_Tel: formStu.stu_Tel
    })
  }

  editStudent(stu_ID: string, formEditStu: editStudent): Observable<any> {
    return this.http.put('/api/Student/UpdateStudent/'+stu_ID, formEditStu)
  }

  deleteStudent(id: string, sta: string) {
    return this.http.delete('/api/Student/DeleteStudent/' + id + '?status=' + sta)
  }

}
