import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  base_url: string = 'http://localhost:3000';

  constructor(public http: HttpClient) {}

  signupUser(user: any) {
    return this.http.post(`${this.base_url}/auth/signup`, user);
  }

  loginUser(user: any) {
    return this.http.post(`${this.base_url}/auth/login`, user);
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }
}
