import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { dataUserAuthen } from '../interfaces/dataUserAuthen/dataUserAuthen';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  Login(data: dataUserAuthen): Observable<any> {
    return this.http.post('/api/Login/Authenticate/authenticate', data);
  }
}
