import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { staEnroll } from '../interfaces/statusEnroll';

@Injectable({
  providedIn: 'root'
})
export class StatusEnrollService {

  constructor(private http: HttpClient) { }

  getSta(): Observable<staEnroll[]> {
    return this.http.get<staEnroll[]>('./assets/data/statusEnroll.json');
  }
}
