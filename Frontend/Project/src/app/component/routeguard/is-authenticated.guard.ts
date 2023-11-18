import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../authen/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard  {


  constructor(private authService:AuthService, private router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isLoggedIn$.pipe(tap(isLoggedIn =>{
      if (!isLoggedIn){
        this.router.navigate(['login'])
      }
    }))
  }

}
