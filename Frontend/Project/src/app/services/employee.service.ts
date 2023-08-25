import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { createEmployee } from '../interfaces/employee/createEmployee';
import { editEmployee } from '../interfaces/employee/editEmployee';




@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }


  getEmployee(): Observable<any> {
    return this.http.post<any>('/api/Employee/GetEmployee', {
      emp_ID: '',
      emp_Name: ''
    })
  }

  deleteEmployee(id: string, sta: string) {
    return this.http.delete('/api/Employee/DeleteEmployee/' + id + '?status=' + sta)
  }

  searchEmployee(searchEmpID: string, searchEmpName: string): Observable<any> {
    return this.http.post('/api/Employee/GetEmployee', {
      emp_ID: searchEmpID,
      emp_Name: searchEmpName
    })
  }

  createEmployee(formEmp: createEmployee): Observable<any> {
    return this.http.post('/api/Employee/AddEmployeeModel', {
      emp_Pass: formEmp.emp_Pass,
      emp_Name: formEmp.emp_Name,
      emp_Sex: formEmp.emp_Sex,
      emp_Add: formEmp.emp_Add,
      emp_Mail: formEmp.emp_Mail,
      emp_Tel: formEmp.emp_Tel
    })
  }

  editEmployee(emp_ID: string, formEditEmp: editEmployee): Observable<any> {
    return this.http.put('/api/Employee/UpdateEmployee/'+emp_ID, formEditEmp)
  }

}
