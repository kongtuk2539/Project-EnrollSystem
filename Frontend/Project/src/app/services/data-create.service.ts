import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataCreateService {
  private apiDataSubject = new BehaviorSubject<any>(null);

  setApiData(data: any) {
    this.apiDataSubject.next(data);
  }

  getApiData() {
    return this.apiDataSubject.asObservable();
  }

  constructor() { }
}
