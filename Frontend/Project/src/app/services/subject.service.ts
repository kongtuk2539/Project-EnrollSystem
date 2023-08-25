import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createSubject } from '../interfaces/subject/createSubject';
import { editSubject } from '../interfaces/subject/editSubject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  getSubject(): Observable<any> {
    return this.http.post<any>('/api/Subject/GetSubject', {
      sub_ID: '',
      sub_Name: ''
    })
  }

  searchSubject(searchSubID: string, searchSubName: string): Observable<any> {
    return this.http.post('/api/Subject/GetSubject', {
      sub_ID: searchSubID,
      sub_Name: searchSubName
    })
  }

  createSubject(formSub: createSubject): Observable<any> {
    return this.http.post('/api/Subject/AddSubjectModel', {
      sub_Name: formSub.sub_Name,
      sub_Price: formSub.sub_Price
    })
  }

  editSubject(sub_ID: string, formEditSub: editSubject): Observable<any> {
    return this.http.put('/api/Subject/UpdateSubject/'+sub_ID, formEditSub)
  }

  deleteSubject(id: string, sta: string) {
    return this.http.delete('/api/Subject/DeleteSubject/' + id + '?status=' + sta)
  }

}
