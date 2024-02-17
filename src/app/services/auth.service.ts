import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { baseUrl } from '../baseUrl';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userToken: BehaviorSubject<string> = new BehaviorSubject(
    JSON.stringify(localStorage.getItem('userToken'))
  );

  constructor(private _httpClient: HttpClient, private _router: Router) {}

  setUserToken() {
    const token = JSON.stringify(localStorage.getItem('userToken')); //make it 'null' if it is null.
    this.userToken.next(token);
  }

  signUp(user: User): Observable<any> {
    return this._httpClient.post(`${baseUrl}/api/v1/auth/signup`, user);
  }
  signIn(user: User): Observable<any> {
    return this._httpClient.post(`${baseUrl}/api/v1/auth/signin`, {
      email: user.email,
      password: user.password,
    });
  }
  signOut() {
    localStorage.removeItem('userToken');
    this.userToken.next('');
    this._router.navigate(['/login']);
  }
}
