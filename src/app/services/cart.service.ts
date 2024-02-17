import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl } from '../baseUrl';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  userToken: string = localStorage.getItem('userToken') || '';
  totalCartItems: BehaviorSubject<number> = new BehaviorSubject(0);
  constructor(private _httpClient: HttpClient) {}
  addToCart(id: string): Observable<any> {
    return this._httpClient.post(
      `${baseUrl}/api/v1/cart`,
      {
        productId: id,
      },
      {
        headers: {
          token: this.userToken,
        },
      }
    );
  }
  getLoggedUserCart(): Observable<any> {
    return this._httpClient.get(`${baseUrl}/api/v1/cart`, {
      headers: {
        token: this.userToken,
      },
    });
  }
}
