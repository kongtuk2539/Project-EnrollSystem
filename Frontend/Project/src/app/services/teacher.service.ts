import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createTeacher } from '../interfaces/teacher/createTeacher';
import { editTeacher } from '../interfaces/teacher/editTeacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }

  getTeacher(): Observable<any> {
    return this.http.post<any>('/api/Teacher/GetTeacher', {
      tec_ID: '',
      tec_Name: ''
    })
  }

  searchTeacher(searchTecID: string, searchTecName: string): Observable<any> {
    return this.http.post('/api/Teacher/GetTeacher', {
      tec_ID: searchTecID,
      tec_Name: searchTecName
    })
  }

  createTeacher(formTec: createTeacher): Observable<any> {
    return this.http.post('/api/Teacher/AddTeacherModel', {
      tec_Pass: formTec.tec_Pass,
      tec_Name: formTec.tec_Name,
      tec_Sex: formTec.tec_Sex,
      tec_Add: formTec.tec_Add,
      tec_Mail: formTec.tec_Mail,
      tec_Tel: formTec.tec_Tel
    })
  }

  editTeacher(tec_ID: string, formEditTec: editTeacher): Observable<any> {
    return this.http.put('/api/Teacher/UpdateTeacher/'+tec_ID, formEditTec)
  }

  deleteTeacher(id: string, sta: string) {
    return this.http.delete('/api/Teacher/DeleteTeacher/' + id + '?status=' + sta)
  }


}
