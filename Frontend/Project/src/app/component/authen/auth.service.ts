import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { dataUserAuthen } from 'src/app/interfaces/dataUserAuthen/dataUserAuthen';
import { userModel } from 'src/app/interfaces/dataUserAuthen/userModel';
import { LoginService } from 'src/app/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_NAME = 'Authorization'
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  user!: userModel;

  get token() {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  constructor(private service: LoginService) {
    this._isLoggedIn$.next(!!this.token);
    this.user = this.getUser(this.token!);
  }

  login(data: dataUserAuthen) {
    return this.service.Login(data).pipe(
      tap((res: any) => {
        localStorage.setItem(this.TOKEN_NAME, `Bearer ${res.token}`);
        this._isLoggedIn$.next(true);
        this.user = this.getUser(res.token);
      })
    );
  }

  private getUser(token: string): userModel {
    if(token != null){
      return JSON.parse(atob(token.split('.')[1])) as userModel;
    }
    return this.user
  }
}
