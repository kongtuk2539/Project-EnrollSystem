import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../authen/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard {

  constructor(private authService: AuthService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var canPass = false;
    var userRole = this.authService.user.role
    route.data['role'].forEach((role: String) => {
      console.log(role)
      console.log("userRole", userRole)
      if (userRole == role) {
        console.log("ผ่านได้", userRole == role)
        canPass = true
      }
    });

    if (canPass == false) {
      console.log("canPass", canPass)
      window.alert('you are not authorized');
    }

    return canPass;
  }

}
