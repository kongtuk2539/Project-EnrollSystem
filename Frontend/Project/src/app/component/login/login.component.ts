import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { dataUserAuthen } from 'src/app/interfaces/dataUserAuthen/dataUserAuthen';
import { LoginService } from 'src/app/services/login.service';
import { AuthService } from '../authen/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  loading:boolean = false;

  constructor(private user: FormBuilder, private _snackBar: MatSnackBar, private router: Router, private authService:AuthService){
    this.form = this.user.group({
      id : ['', Validators.required],
      password : ['', Validators.required]
    })
  }

  login() {
    const id = this.form.value.id;
    const password = this.form.value.password;

    const data: dataUserAuthen = {
      username: id,
      password: password
    }


    this.authService.login(data).subscribe((res) => {
      if(res){
        this.fakeloading();
      }

    },(error) => {
      this.error();
    })
  }

  error() {
    this._snackBar.open('error id or password is wrong', 'close',{
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  fakeloading() {
    this.loading = true;
    setTimeout(() => {

      this.router.navigate(['home']);
    }, 1500);
  }

}
