import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(public _auth: AuthService, public _router: Router) {}

  isInvalid: boolean = false;
  errorMessage: string = '';
  user = {
    username: '',
    password: '',
  };

  ngOnInit(): void {}

  login() {
    this.isInvalid = false;
    this._auth.loginUser(this.user).subscribe(
      (res: any) => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isInvalid = true;
      }
    );
  }
}
