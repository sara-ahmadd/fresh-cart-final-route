import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = 'https://ecommerce.routemisr.com';
  constructor(private _httpClient: HttpClient) {}

  signUp(user: User): Observable<any> {
    return this._httpClient.post(`${this.baseUrl}/api/v1/auth/signup`, user);
  }
  signIn(user: User): Observable<any> {
    return this._httpClient.post(`${this.baseUrl}/api/v1/auth/signin`, {
      email: user.email,
      password: user.password,
    });
  }
}
