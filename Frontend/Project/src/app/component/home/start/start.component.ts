import { Component } from '@angular/core';
import { AuthService } from '../../authen/auth.service';
import { userModel } from 'src/app/interfaces/dataUserAuthen/userModel';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {
  user!: userModel

  constructor(private authService:AuthService){
    this.user = this.authService.user
    console.log('start', this.user.id)
  }


}
