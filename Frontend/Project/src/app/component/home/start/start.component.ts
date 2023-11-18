import { Component } from '@angular/core';
import { AuthService } from '../../authen/auth.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {
  user!: any

  constructor(private authService: AuthService) {
    this.user = this.authService.user
    console.log('start', this.user)
  }


}
