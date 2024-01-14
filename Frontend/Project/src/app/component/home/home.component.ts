import { Component } from '@angular/core';
import { AuthService } from '../authen/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  IsLogin: boolean = false;
  constructor(public authService: AuthService) {
    authService.isLoggedIn$.subscribe(data => {
      this.IsLogin = data;
    })
  }


}
