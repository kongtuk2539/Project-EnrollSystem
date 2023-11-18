import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetReportService {

  constructor(private http: HttpClient) { }

  getReport(nameReport: string, body: object): Observable<HttpResponse<Blob>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    return this.http.post(`/api/CreateReport/${nameReport}`, body, {
      headers,
      observe: 'response',
      responseType: 'blob'
    });
  }
}
