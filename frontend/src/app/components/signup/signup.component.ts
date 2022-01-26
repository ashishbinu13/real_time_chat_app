import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  user = {
    name: '',
    username: '',
    email: '',
    password: '',
    cPassword: '',
  };
  isInvalid: boolean = false;
  errorMessage: string = '';

  constructor(public _auth: AuthService, public _router: Router) {}

  ngOnInit(): void {}

  signup() {
    this.isInvalid = false;
    this._auth.signupUser(this.user).subscribe(
      (data) => {
        alert('success');
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isInvalid = true;
      }
    );
  }
}
